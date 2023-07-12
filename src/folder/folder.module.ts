import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Folder} from './folder.entity'
import {folderService} from './folder.service'
import {folderController} from './folder.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Folder])],
    providers: [folderService],
    controllers: [folderController],
    exports: [folderService]
})
export class FolderModule{}