import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { typeService } from './typeService.entity';
import { Repository } from 'typeorm';
import { createTypeServiceDto } from './dto/create-typeService.dto';
import { updateTypeServiceDto } from './dto/update-typeService.dto';

@Injectable()
export class typeServiceService{
    constructor(
        @InjectRepository(typeService) private typeServiceRepository: Repository<typeService>
    ){}

    async createTypeService(typeService: createTypeServiceDto){
        const typeServiceFound = await this.typeServiceRepository.findOne({
            where: {
                name: typeService.name
            }
        }) 
        if(typeServiceFound){
            return new HttpException('type Service alrealy exists', HttpStatus.NOT_FOUND)
        }
        const newTypeService = this.typeServiceRepository.create(typeService)
        return this.typeServiceRepository.save(newTypeService)
    }

    gettypeServices(){
        return this.typeServiceRepository.find({
            relations: ['services']
        })
    }

    gettypeService(id: number){
        const typeServiceFound = this.typeServiceRepository.findOne({
            where: {
                id
            },
            relations: ['services']
        })
        if(!typeService){
            return new HttpException('type service not found', HttpStatus.NOT_FOUND)
        }
        return typeServiceFound
    }

    async deleteTypeService(id: number){
        const resul = await this.typeServiceRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateTypeService(id: number, typeService: updateTypeServiceDto){
        const typeServiceFound = await this.typeServiceRepository.findOne({
           where: {
               id
           }
        });
        if(!typeServiceFound){
           return new HttpException('type  service not found', HttpStatus.NOT_FOUND);
         }
   
       const updateTypeService = Object.assign(typeServiceFound, typeService)
       return this.typeServiceRepository.save(updateTypeService)
       }
}