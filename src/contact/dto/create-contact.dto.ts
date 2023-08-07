import { IsString, IsNotEmpty, MinLength } from 'class-validator'

export class createContactDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string

  @IsString()
  @IsNotEmpty()
  typeContact: string

  isActive: boolean
}
