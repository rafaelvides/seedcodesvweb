import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {File} from '../file/file.entity'
import {fileController} from './file.controller'
import {fileService} from "./file.service";
import {FolderModule} from "../folder/folder.module";

@Module ({
    imports: [TypeOrmModule.forFeature([File]), FolderModule],
    controllers: [fileController],
    providers: [fileService],
    
})
export class FileModule{}