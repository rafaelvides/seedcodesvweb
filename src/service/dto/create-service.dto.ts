import {IsNotEmpty, MinLength, IsNumber} from 'class-validator';
export class createServiceDto{

    @IsNumber()
    @IsNotEmpty()
    payment: number

    @IsNumber()
    @IsNotEmpty()
    typeId: number

    isActive: boolean
}