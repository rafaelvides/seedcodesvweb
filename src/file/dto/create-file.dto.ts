import {IsString, IsNumber, IsNotEmpty, IsInt} from 'class-validator'

export class createFileDto{

    @IsString()
    @IsNotEmpty()
    file: string

    @IsNumber()
    @IsNotEmpty()
    @IsInt()
    folderId: number

    isActive: boolean
}