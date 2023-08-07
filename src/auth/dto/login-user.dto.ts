import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @MinLength(10)
  password: string
}
