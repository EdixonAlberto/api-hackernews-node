import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import { UsersService } from '../../users/services/users.service'
import { UserEntity } from '../../users/user.entity'

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: TJwtPayload): Promise<UserEntity> {
    const user: UserEntity = await this.usersService.getByEmail(payload.email)

    if (!user) throw new UnauthorizedException()

    return user
  }
}
