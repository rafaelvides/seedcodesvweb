import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import {Service} from '../service/service.entity'
import { Repository } from 'typeorm';
import { typeServiceService } from 'src/typeService/typeService.service';
import { createServiceDto } from './dto/create-service.dto';
import { updateServiceDto } from './dto/update-service.dto';

@Injectable()
export class serviceService{
    constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>,
    private typeService: typeServiceService
    ){}

    async createService(service: createServiceDto){
        const typeServiceFound = await this.typeService.gettypeService(service.typeId)
         
        if(!typeServiceFound) return new HttpException('Service already exists', HttpStatus.NOT_FOUND)

        const newService = this.serviceRepository.create(service)
        return this.serviceRepository.save(newService)
    }

    getServices(){
        return this.serviceRepository.find({
            relations: ['typeServiceC']
        })
    }

    getService(id: number){
        const ServiceFound = this.serviceRepository.findOne({
            where: {
                id
            },
            relations: ['typeServiceC']
        })
        if(!ServiceFound){
            return new HttpException('Service not found', HttpStatus.NOT_FOUND)
        }
        return ServiceFound
    }

    async deleteService(id: number){
        const resul = await this.serviceRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateService(id: number, service: updateServiceDto){
        const serviceFound = await this.serviceRepository.findOne({
           where: {
               id
           }
        });
        if(!serviceFound){
           return new HttpException('service not found', HttpStatus.NOT_FOUND);
         }
   
       const updateService = Object.assign(serviceFound, service)
       return this.serviceRepository.save(updateService)
       }
}