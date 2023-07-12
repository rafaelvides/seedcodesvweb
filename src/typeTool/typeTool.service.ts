import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {typeTool} from './typeTool.entity'
import { createTypeToolDto } from './dto/create-typeTool.dto';
import { updateTypeToolDto } from './dto/update-typeTool.dto';

@Injectable()
export class typeToolService{
    constructor(
        @InjectRepository(typeTool) private typeToolRepository: Repository<typeTool>
    ){}

    async createTypeTool(typeTool: createTypeToolDto){
        const typeToolFound = await this.typeToolRepository.findOne({
            where: {
                type: typeTool.type
            }
        })
        if(typeToolFound){
            return new HttpException('type tool  already exists', HttpStatus.NOT_FOUND)
        }
        const newTypeTool = this.typeToolRepository.create(typeTool)
        return this.typeToolRepository.save(newTypeTool)
    }

    gettypeTools(){
      return this.typeToolRepository.find({
        relations: ['tools']
      })
    }

    gettypeTool(id: number){
        const typeToolFound = this.typeToolRepository.findOne({
            where: {
                id
            },
            relations: ['tools']
        })
        if(!typeToolFound){
            return new HttpException('type tool not found', HttpStatus.NOT_FOUND)
        }
        return typeToolFound
    }

    async deleteTypeTool(id: number){
        const resul = await this.typeToolRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateTool(id: number, tool: updateTypeToolDto){
        const toolFound = await this.typeToolRepository.findOne({
           where: {
               id
           }
        });
        if(!toolFound){
           return new HttpException('type tool not found', HttpStatus.NOT_FOUND);
         }
   
       const updateTool = Object.assign(toolFound, tool)
       return this.typeToolRepository.save(updateTool)
       }
}