import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'
import { PostEntity } from './../src/posts/post.entity'

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
    agent = request.agent(server) // since the application is already listening, it should use the allocated port
  })

  afterEach(async () => {
    await app.close()
    if (server) await server.close()
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
