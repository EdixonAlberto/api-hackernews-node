import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseModule } from '../../database/database.module'
import { UserEntity } from '../../users/user.entity'
import { JwtStrategyService } from './jwt-strategy.service'
import { UsersService } from '../../users/services/users.service'

describe('JwtStrategyService', () => {
  let service: JwtStrategyService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, TypeOrmModule.forFeature([UserEntity])],
      providers: [JwtStrategyService, UsersService]
    }).compile()

    service = module.get<JwtStrategyService>(JwtStrategyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
