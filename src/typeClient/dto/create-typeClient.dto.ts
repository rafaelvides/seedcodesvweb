import {IsString, IsNotEmpty} from 'class-validator';
export class CreateTypeClientDto {

    @IsString()
    @IsNotEmpty()
    tipe: string

    isActive: boolean
}