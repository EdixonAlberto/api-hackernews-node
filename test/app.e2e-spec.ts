import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'
import { PostEntity } from './../src/posts/post.entity'
import { UserEntity } from '../src/users/user.entity'

jest.setTimeout(30000)

process.env.NODE_ENV = 'test'

describe('AppModule (e2e)', () => {
  let app: INestApplication
  let server = null
  let agent: request.SuperAgentTest

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = await moduleFixture.createNestApplication().init()
    server = await app.listen(4000)
    // Since the application is already listening, it should use the allocated port
    agent = request.agent(server)
  })

  afterEach(async () => {
    await app.close()
    if (server) await server.close()
  })

  describe('CRUD Module Users', () => {
    let user: UserEntity

    it('POST: /users', async () => {
      const newUser: UserEntity = {
        email: 'example@email.com',
        password: '1234'
      }

      const userResponse = await agent.post('/users').type('json').send(newUser).expect(201)
      const { email } = userResponse.body as UserEntity
      user = userResponse.body

      expect(email).toEqual(newUser.email)
    })

    it('GET: /users', async () => {
      const usersResponse = await agent.get('/users').expect(200)
      const users = usersResponse.body as UserEntity[]

      expect(users.length).toBeTruthy()
    })

    it('DELETE: /uses/:id', async () => {
      const userResponse = await agent.delete(`/users/${user.user_id}`).expect(200)
      const { email } = userResponse.body as UserEntity

      expect(email).toEqual(user.email)
    })
  })

  describe('CRUD Module Posts', () => {
    let post: PostEntity

    it('POST: /posts/refresh', async () => {
      const refreshResponse = await agent.post('/posts/refresh').expect(201)
      const { response } = refreshResponse.body as TRefreshResponse

      expect(response).toBe<string>('Refreshed Database')
    })

    it('GET: /posts/pate/:nroPage?{...filter}', async () => {
      const filter = '?month=April&tag=story'
      const postsResponse = await agent.get(`/posts/page/1${filter}`).expect(200)
      const qtyPosts = postsResponse.body.length

      expect(qtyPosts).toBeTruthy()
    })

    it('GET: /posts', async () => {
      const postsResponse = await agent.get('/posts').expect(200)
      const qtyPosts = postsResponse.body.length
      post = postsResponse.body[0]

      expect(qtyPosts).toBeTruthy()
    })

    it('DELETE: /posts/:id', async () => {
      await agent.delete(`/posts/${post.post_id}`).expect(200)
    })
  })
})
