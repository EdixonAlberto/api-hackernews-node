import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'

import { AuthService } from './services/auth.service'
import { LoginUserDto } from '../users/dto'
import { LoginDto } from './dto'

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: LoginDto })
  async login(@Body() { email, password }: LoginUserDto) {
    const userValid = await this.authService.validateUser(email, password)

    if (!userValid) throw new UnauthorizedException()

    return await this.authService.generateAccessToken(email)
  }
}
