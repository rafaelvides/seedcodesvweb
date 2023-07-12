import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {typeProject} from './typeProject.entity'
import {typeProjectService} from './typeProject.Service'
import {typeProjectController} from './typeProject.controller'

@Module({
    imports: [TypeOrmModule.forFeature([typeProject])],
    providers: [typeProjectService],
    controllers: [typeProjectController],
    exports: [typeProjectService]
})
export class typeProjectModule {}