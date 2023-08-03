import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {Proyect} from './project..entity'
import {projectController} from './project.controller'
import {projectService} from "./project.service";
import {typeProjectModule} from "src/typeProject/typeProject.module";
import { Tool } from "src/tool/tool.entity";
import { typeProject } from "src/typeProject/typeProject.entity";
import { User } from "src/user/user.entity";
import { Client } from "src/client/client.entity";
import { AuthModule } from "src/auth/auth.module";

@Module ({
    imports: [TypeOrmModule.forFeature([Proyect, Tool, typeProject, User, Client]), typeProjectModule, AuthModule],
    controllers: [projectController],
    providers: [projectService],
    
})
export class ProyectModule{}