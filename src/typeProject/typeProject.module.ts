import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {typeProject} from './typeProject.entity'
import {typeProjectService} from './typeProject.Service'
import {typeProjectController} from './typeProject.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
    imports: [TypeOrmModule.forFeature([typeProject]), AuthModule],
    providers: [typeProjectService],
    controllers: [typeProjectController],
    exports: [typeProjectService]
})
export class typeProjectModule {}