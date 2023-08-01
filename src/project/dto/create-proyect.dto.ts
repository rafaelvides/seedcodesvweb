import {IsString, IsNotEmpty, MinLength, IsNumber} from 'class-validator';
export class createProyectDto{

    @IsString()
    @IsNotEmpty()
    nameProyect: string

    @IsString()
    @IsNotEmpty()
    description: string

    isActive: boolean


    @IsNumber()
    @IsNotEmpty()
    toolId: number

    @IsNumber()
    @IsNotEmpty()
    typeProjectId: number

    @IsNumber()
    @IsNotEmpty()
    clientId: number

    @IsNumber()
    @IsNotEmpty()
    userId: number
}