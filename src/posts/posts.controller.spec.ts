import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'

import { DatabaseProvider } from '../database/database.provider'
import { PostEntity } from './post.entity'
import { PostsController } from './posts.controller'
import { PostsService } from './services/posts.service'
import { HitsService } from './services/hits.service'

describe('PostsController', () => {
  let controller: PostsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseProvider,
        TypeOrmModule.forFeature([PostEntity]),
        HttpModule
      ],
      controllers: [PostsController],
      providers: [PostsService, HitsService]
    }).compile()

    controller = module.get<PostsController>(PostsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
