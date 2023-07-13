import {IsString, IsNotEmpty, MinLength} from 'class-validator';
export class createRoleDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    rol: string
}