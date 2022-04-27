import { ApiProperty } from '@nestjs/swagger'
import { IsUUID } from 'class-validator'

export class ParamPostDto {
  @ApiProperty()
  @IsUUID()
  readonly id: string
}
