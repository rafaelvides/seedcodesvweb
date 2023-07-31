import {IsString, IsNotEmpty, IsNumber} from 'class-validator';
export class createToolDto{

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsNumber()
    @IsNotEmpty()
    typeToolId: number

    isActive: boolean
}