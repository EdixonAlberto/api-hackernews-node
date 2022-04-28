import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseModule } from '../../database/database.module'
import { UserEntity } from '../../users/user.entity'
import { JwtProvider } from '../jwt.provider'
import { AuthService } from '../services/auth.service'
import { UsersService } from '../../users/services/users.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        DatabaseModule,
        TypeOrmModule.forFeature([UserEntity]),
        JwtProvider
      ],
      providers: [AuthService, UsersService]
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
