import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {File} from '../file/file.entity'
import {fileController} from './file.controller'
import {fileService} from "./file.service";
import {FolderModule} from "../folder/folder.module";
import { Folder } from "src/folder/folder.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([File, Folder]), FolderModule],
    controllers: [fileController],
    providers: [fileService],
    
})
export class FileModule{}