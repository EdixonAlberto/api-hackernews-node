import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config/dist/config.module'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseProvider } from '../database/database.provider'
import { UserEntity } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './services/users.service'

describe('UsersController', () => {
  let controller: UsersController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseProvider, TypeOrmModule.forFeature([UserEntity])],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile()

    controller = module.get<UsersController>(UsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
