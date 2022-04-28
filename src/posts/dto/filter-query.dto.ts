import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsNotEmpty, IsIn } from 'class-validator'

import { MONTH_NAMES } from '../constants'

export class FilterQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly author?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly tag?: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly title?: string

  @ApiProperty({ required: false, enum: MONTH_NAMES, enumName: 'Month' })
  @IsOptional()
  @IsIn(MONTH_NAMES)
  readonly month?: string
}
