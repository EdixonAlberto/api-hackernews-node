import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsPositive } from 'class-validator'

export class ParamPageDto {
  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { message: 'nroPage must be a number positive and no decimals' })
  @IsPositive()
  readonly nroPage: number
}
