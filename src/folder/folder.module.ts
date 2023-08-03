import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Folder} from './folder.entity'
import {folderService} from './folder.service'
import {folderController} from './folder.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([Folder]), AuthModule],
    providers: [folderService],
    controllers: [folderController],
    exports: [folderService]
})
export class FolderModule{}