import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {File} from '../file/file.entity'
import {fileController} from './file.controller'
import {fileService} from "./file.service";
import {FolderModule} from "../folder/folder.module";
import { Folder } from "src/folder/folder.entity";
import { AuthModule } from "src/auth/auth.module";

@Module ({
    imports: [TypeOrmModule.forFeature([File, Folder]), FolderModule, AuthModule],
    controllers: [fileController],
    providers: [fileService],
    
})
export class FileModule{}