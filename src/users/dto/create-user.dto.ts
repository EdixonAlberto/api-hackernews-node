import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, MinLength, MaxLength, IsNotEmpty, Matches } from 'class-validator'

export class CreateUserDto {
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

  @ApiProperty({
    example: '1234abcd'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string
}
