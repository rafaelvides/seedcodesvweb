import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator';
export class createProyectDto{

    @IsString()
    @IsNotEmpty()
    nameProyect: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    toolId: number

    @IsNumber()
    @IsNotEmpty()
    typeId: number

    @IsNumber()
    @IsNotEmpty()
    clientId: number

    @IsNumber()
    @IsNotEmpty()
    userId: number
}