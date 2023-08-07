import { IsString, IsNotEmpty } from 'class-validator'
export class CreateTypeClientDto {
  @IsString()
  @IsNotEmpty()
  type: string

  isActive: boolean
}
