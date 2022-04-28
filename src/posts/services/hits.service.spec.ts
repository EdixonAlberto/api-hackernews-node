import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'

import { DatabaseProvider } from '../../database/database.provider'
import { PostEntity } from '../post.entity'
import { HitsService } from './hits.service'

describe('HitsService', () => {
  let service: HitsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseProvider,
        TypeOrmModule.forFeature([PostEntity]),
        HttpModule
      ],
      providers: [HitsService]
    }).compile()

    service = module.get<HitsService>(HitsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
