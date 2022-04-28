import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty()
  @IsString()
  readonly accessToken: string
}
