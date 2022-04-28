import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { UserEntity } from '../users/user.entity'
import { JwtProvider } from './jwt.provider'
import { AuthController } from './auth.controller'
import { AuthService } from './services/auth.service'
import { UsersService } from '../users/services/users.service'
import { JwtStrategyService } from './services/jwt-strategy.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtProvider, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategyService]
})
export class AuthModule {}
