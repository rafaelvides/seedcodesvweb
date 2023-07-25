import {IsString, IsNotEmpty} from 'class-validator';
export class createTypeServiceDto{

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    payment: number
}