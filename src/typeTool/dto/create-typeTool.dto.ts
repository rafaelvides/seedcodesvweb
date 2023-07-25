import {IsString, IsNotEmpty} from 'class-validator';
export class createTypeToolDto{

    @IsString()
    @IsNotEmpty()
    type: string

    isActive: boolean
}