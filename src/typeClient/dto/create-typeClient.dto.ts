import {IsString, IsNotEmpty, MinLength} from 'class-validator';
export class CreateTypeClientDto {

    @IsString()
    @IsNotEmpty()
    tipe: string
}