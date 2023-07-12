import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {typeTool} from './typeTool.entity'
import {typeToolService} from './typeTool.service'
import {typeToolController} from './typeTool.controller'

@Module({
    imports: [TypeOrmModule.forFeature([typeTool])],
    providers: [typeToolService],
    controllers: [typeToolController],
    exports: [typeToolService]
})
export class typeToolModule {}