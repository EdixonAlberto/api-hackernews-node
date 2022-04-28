import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { DatabaseModule } from '../database/database.module'
import { UserEntity } from '../users/user.entity'
import { JwtProvider } from './jwt.provider'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/services/users.service'
import { AuthService } from './services/auth.service'
import { JwtStrategyService } from './services/jwt-strategy.service'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtProvider,
        PassportModule
      ],
      controllers: [AuthController],
      providers: [AuthService, UsersService, JwtStrategyService]
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
