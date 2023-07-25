import {IsString, IsNotEmpty, MinLength} from 'class-validator';

export class createFolderDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    path: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string

    isActive: boolean

}