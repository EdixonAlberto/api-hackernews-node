import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../../users/services/users.service'
import { UserEntity } from '../../users/user.entity'
import { LoginDto } from '../dto'

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    const user: UserEntity = await this.usersService.getByEmail(email)
    return user ? await user.validatePassword(password) : false
  }

  async generateAccessToken(email: string): Promise<LoginDto> {
    const user: UserEntity = await this.usersService.getByEmail(email)

    const payload: TJwtPayload = {
      username: user.username,
      email: user.email
    }

    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
