import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Tool } from './tool.entity';
import { Repository } from 'typeorm';
import { typeToolService } from 'src/typeTool/typeTool.service';
import { createToolDto } from './dto/create-tool.dto';
import { retry } from 'rxjs';
import { updateToolDto } from './dto/update-tool.dto';

@Injectable()
export class toolService{
    constructor(@InjectRepository(Tool) private toolRepository: Repository<Tool>,
    private typeToolService: typeToolService
    ){}

    async createTool(tool: createToolDto){
        const typeToolFound = await this.typeToolService.gettypeTool(tool.typeId)

        if(!typeToolFound) return new HttpException('Tool already exists', HttpStatus.NOT_FOUND)

        const newTool = this.toolRepository.create(tool)
        return this.toolRepository.save(newTool)
    }

    getTools(){
        return this.toolRepository.find({
            relations: ['typeToolC']
        })
    }

    getTool(id: number){
        const toolFound = this.toolRepository.findOne({
            where: {
                id
            },
            relations: ['typeToolC']
        })
        if(!toolFound){
            return new HttpException('Tool not found', HttpStatus.NOT_FOUND)
        }
        return toolFound
    }

    async deleteTool(id: number){
        const resul = await this.toolRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('tool not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateTool(id: number, tool: updateToolDto){
        const toolFound = await this.toolRepository.findOne({
           where: {
               id
           }
        });
        if(!toolFound){
           return new HttpException('tool not found', HttpStatus.NOT_FOUND);
         }
   
       const updateTool = Object.assign(toolFound, tool)
       return this.toolRepository.save(updateTool)
       }

}