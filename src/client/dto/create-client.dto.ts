import { IsString, IsNotEmpty, MinLength, IsNumber, IsEmail, Validate, IsPhoneNumber} from 'class-validator';
import {ValidatorDUI} from 'src/validation/validationDUI'

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  firsname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  lastname: string;
  
  @IsNotEmpty()
  @IsPhoneNumber()
  telephone: string;

  @IsString() 
  @IsNotEmpty()
  @Validate(ValidatorDUI)
  documentidentity: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  tipeId: number;
}
