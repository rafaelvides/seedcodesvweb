import {IsString, IsNotEmpty, MinLength, IsNumber, IsInt} from 'class-validator';

export class createHomeDto{

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

    @IsString()
    @IsNotEmpty()
    imag: string

    @IsString()
    @IsNotEmpty()
    service: string

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    contactId: number
}