import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import {Proyect} from '../project/project..entity'
import { Repository } from 'typeorm';
import {typeProjectService} from '../typeProject/typeProject.Service'
import { createProyectDto } from './dto/create-proyect.dto';
import { updateProjectDto } from './dto/update-project.dto';

@Injectable()
export class projectService {
    constructor(@InjectRepository(Proyect) private projectRepository: Repository<Proyect>,
    private typeProyectService: typeProjectService
    ){}

    async createProject(project: createProyectDto){
        const typeProjectFound = await this.typeProyectService.getTypeProject(project.typeId)
        if(!typeProjectFound) return new HttpException('Project already exists', HttpStatus.NOT_FOUND)

        const newProject = this.projectRepository.create(project)
        return this.projectRepository.save(newProject)
    }

    getProjects(){
        return this.projectRepository.find({
            relations: ['typeProjectC']
        })
    }

    getProject(id: number){
        const projectFound = this.projectRepository.findOne({
            where: {
                id
            },
            relations: ['typeProjectC']
        })
        if(!projectFound){
            return new HttpException('Project not found', HttpStatus.NOT_FOUND)
        }
        return projectFound
    }

    async deleteProject(id: number){
        const resul = await this.projectRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateProject(id: number, project: updateProjectDto){
        const projectFound = await this.projectRepository.findOne({
           where: {
               id
           }
        });
        if(!projectFound){
           return new HttpException('project not found', HttpStatus.NOT_FOUND);
         }
   
       const updateProject = Object.assign(projectFound, project)
       return this.projectRepository.save(updateProject)
       }
}