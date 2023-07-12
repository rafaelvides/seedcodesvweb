import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {Proyect} from './project..entity'
import {projectController} from './project.controller'
import {projectService} from "./project.service";
import {typeProjectModule} from "src/typeProject/typeProject.module";

@Module ({
    imports: [TypeOrmModule.forFeature([Proyect]), typeProjectModule],
    controllers: [projectController],
    providers: [projectService],
    
})
export class ProyectModule{}