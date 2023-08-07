import { IsString, IsNotEmpty } from 'class-validator'
export class createTypeProyectDto {
  @IsString()
  @IsNotEmpty()
  type: string

  isActive: boolean
}
