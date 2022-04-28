import { IsUUID, IsOptional, IsString, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { UserEntity } from '../user.entity'

export class UserDto {
  @ApiProperty({
    format: '/^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$/',
    example: 'a87a280c-7202-46f0-b145-1948d2b15932'
  })
  @IsUUID()
  readonly userId: string

  @ApiProperty({
    required: false,
    minLength: 5,
    maxLength: 20
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @IsNotEmpty()
  readonly username?: string

  @ApiProperty({
    format: '/^[a-z0-9_.]+@[a-z]+.[a-z]+$/',
    example: 'example@email.com'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9_.]+\@[a-z]+\.[a-z]+$/)
  readonly email: string

  constructor({ user_id, username, email }: UserEntity) {
    this.userId = user_id
    this.username = username
    this.email = email
  }
}
