import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class ParamPostDto {
  @ApiProperty({
    format: '/^[a-z0-9]{8}(-[a-z0-9]{4}){3}-[a-z0-9]{12}$/',
    example: 'a87a280c-7202-46f0-b145-1948d2b15932'
  })
  @IsUUID()
  readonly id: string
}
