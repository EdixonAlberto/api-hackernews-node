import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'

import { DatabaseProvider } from '../../database/database.provider'
import { PostEntity } from '../post.entity'
import { PostsService } from './posts.service'
import { HitsService } from './hits.service'

describe('PostsService', () => {
  let service: PostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseProvider,
        TypeOrmModule.forFeature([PostEntity]),
        HttpModule
      ],
      providers: [PostsService, HitsService]
    }).compile()

    service = module.get<PostsService>(PostsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
