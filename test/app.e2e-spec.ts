import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'
import { PostEntity } from './../src/posts/post.entity'
import { UserEntity } from '../src/users/user.entity'
import { LoginUserDto } from '../src/users/dto'
import { LoginDto } from '../src/auth/dto'
import { MONTH_NAMES } from '../src/posts/constants'
// eslint-disable-next-line
const randomEmail = require('random-email')

jest.setTimeout(30000)

process.env.NODE_ENV = 'test'

describe('AppModule (e2e)', () => {
  let app: INestApplication
  let server = null
  let agent: request.SuperAgentTest
  let token: string
  let user: Partial<UserEntity>

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

  describe('CRUD Module Users and Auth', () => {
    it('POST: /api/users', async () => {
      const newUser: Partial<UserEntity> = {
        email: randomEmail(),
        password: '1234abcd'
      }

      const userResponse = await agent.post('/api/users').type('json').send(newUser).expect(201)
      const { user_id, email } = userResponse.body as UserEntity
      user = { ...newUser, user_id }

      expect(email).toEqual(newUser.email)
    })

    it('POST: /api/auth', async () => {
      const login = <LoginUserDto>{
        email: user.email,
        password: user.password
      }

      const loginResponse = await agent.post('/api/auth').type('json').send(login).expect(200)
      const { accessToken } = loginResponse.body as LoginDto
      token = accessToken

      expect(accessToken).toBeTruthy()
    })

    it('GET: /api/users', async () => {
      const usersResponse = await agent.get('/api/users').auth(token, { type: 'bearer' }).expect(200)
      const users = usersResponse.body as UserEntity[]

      expect(users.length).toBeTruthy()
    })
  })

  describe('CRUD Module Posts and DELETE user', () => {
    let post: PostEntity

    it('POST: /api/posts/refresh', async () => {
      const refreshResponse = await agent.post('/api/posts/refresh').auth(token, { type: 'bearer' }).expect(201)
      const { response } = refreshResponse.body as TRefreshResponse

      expect(response).toBe<string>('Refreshed Database')
    })

    it('GET: /api/posts/pate/:nroPage?filters', async () => {
      const currentMonth = MONTH_NAMES[new Date().getMonth()]
      const tags = ['story', 'comment']

      const postsPromises = tags.map(async tag => {
        const filters = `month=${currentMonth}&tag=${tag}`
        return agent.get(`/api/posts/page/1?${filters}`).auth(token, { type: 'bearer' }).expect(200)
      })

      const [postsResponse1, postsResponse2] = await Promise.all(postsPromises)
      const qtyPosts = postsResponse1.body.length || postsResponse2.body.length

      expect(qtyPosts).toBeTruthy()
    })

    it('GET: /api/posts', async () => {
      const postsResponse = await agent.get('/api/posts').auth(token, { type: 'bearer' }).expect(200)
      const qtyPosts = postsResponse.body.length
      post = postsResponse.body[0]

      expect(qtyPosts).toBeTruthy()
    })

    it('DELETE: /api/posts/:id', async () => {
      await agent.delete(`/api/posts/${post.post_id}`).auth(token, { type: 'bearer' }).expect(200)
    })

    it('DELETE: /api/uses/:id', async () => {
      const userResponse = await agent.delete(`/api/users/${user.user_id}`).auth(token, { type: 'bearer' }).expect(200)
      const { email } = userResponse.body as UserEntity

      expect(email).toEqual(user.email)
    })
  })
})
