import { IsString, IsNotEmpty, IsNumber, IsInt, IsUrl } from 'class-validator'

export class createHomeDto {
  @IsString()
  @IsNotEmpty()
  motto: string

  @IsString()
  @IsNotEmpty()
  mission: string

  @IsString()
  @IsNotEmpty()
  vision: string

  @IsString()
  @IsNotEmpty()
  values: string

  @IsNotEmpty()
  @IsUrl()
  imag: string

  isActive: boolean
}
