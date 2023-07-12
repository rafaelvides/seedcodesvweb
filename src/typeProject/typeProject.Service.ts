import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import {createTypeProyectDto} from './dto/create-typeProject.dto'
import {typeProject} from './typeProject.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { updateTypeProjectDto } from './dto/update-typeProject.dto'

@Injectable()
export class typeProjectService{
    constructor(
      @InjectRepository(typeProject) private typeProjectRepository: Repository<typeProject>
    ){}

    async createTypeProyect(typeProject: createTypeProyectDto){
        const typeProjectFound = await this.typeProjectRepository.findOne({
            where: {
                type: typeProject.type
            }
        })

        if(typeProjectFound){
            return new HttpException('type Project already exists', HttpStatus.NOT_FOUND)
        }
        const newTypeProject = this.typeProjectRepository.create(typeProject)
        return this.typeProjectRepository.save(newTypeProject)
    }

    getTypeProjects(){
        return this.typeProjectRepository.find({
            relations: ['proyects']
        })
    }

    getTypeProject(id: number){
        const typeProjectFound = this.typeProjectRepository.findOne({
            where: {
                id
            },
            relations: ['proyects']
        })
        if(!typeProject){
            return new HttpException('type project not found', HttpStatus.NOT_FOUND)
        }
        return typeProjectFound
    }

    async deleteTypeProject(id: number){
        const resul = await this.typeProjectRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateTypeProject(id: number, typeProject: updateTypeProjectDto){
        const typeProjectFound = await this.typeProjectRepository.findOne({
           where: {
               id
           }
        });
        if(!typeProjectFound){
           return new HttpException('type project not found', HttpStatus.NOT_FOUND);
         }
   
       const updateTypeProject = Object.assign(typeProjectFound, typeProject)
       return this.typeProjectRepository.save(updateTypeProject)
       }
}