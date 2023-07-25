import {IsString, IsNotEmpty, IsEmail} from 'class-validator';
export class createUserDto{

    @IsString()
    @IsNotEmpty()
    lastname: string
    
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    isActive: boolean

    @IsNotEmpty()
    roleId: number
}