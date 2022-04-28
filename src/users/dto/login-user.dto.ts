import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, Matches, MinLength } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({
    format: '/^[a-z0-9_.]+@[a-z]+.[a-z]+$/',
    example: 'example@email.com'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9_.]+\@[a-z]+\.[a-z]+$/)
  readonly email: string

  @ApiProperty({
    example: '1234abcd'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string
}
