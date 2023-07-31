import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {Tool} from './tool.entity'
import {toolController} from './tool.controller'
import {toolService} from "./tool.service";
import {typeToolModule} from "src/typeTool/typeTool.module";
import { typeTool } from "src/typeTool/typeTool.entity";

@Module ({
    imports: [TypeOrmModule.forFeature([Tool, typeTool]), typeToolModule],
    controllers: [toolController],
    providers: [toolService],
    
})
export class ToolModule{}