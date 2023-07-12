import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { typeClient } from "./typeClient.entity";
import { Repository } from "typeorm";
import { CreateTypeClientDto } from "./dto/create-typeClient.dto";
import { updateTypeClientDto } from "./dto/update-typeClient.dto";

@Injectable()
export class typeClientService{  
    constructor(
        @InjectRepository(typeClient) private typeClientRepository: Repository<typeClient>, 
  
    ){}
     
    async createTypeClient(typeClient: CreateTypeClientDto ){
        const typeclientFound = await this.typeClientRepository.findOne({
            where: {
                tipe: typeClient.tipe
            }
        })
        if(typeclientFound){
            return new HttpException('Type client already exists', HttpStatus.NOT_FOUND)
        }

        const newTypeClient = this.typeClientRepository.create(typeClient)
        return this.typeClientRepository.save(newTypeClient)
    }

    gettypeClients(){
        return this.typeClientRepository.find({
            relations: ['clients']
        })
    }

    gettypeClient(id: number){
        const typeclientFound = this.typeClientRepository.findOne({
            where: {
                id
            },
         relations: ['clients']
        })
        if(!typeclientFound){
            return new HttpException('type client not found', HttpStatus.NOT_FOUND)
        }
        return typeclientFound
    }

    async deleteTypeClient(id: number){
        const resul = await this.typeClientRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('type client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateTypeClient(id: number, typeClient: updateTypeClientDto){
        const typeClientFound = await this.typeClientRepository.findOne({
           where: {
               id
           }
        });
        if(!typeClientFound){
           return new HttpException('type client not found', HttpStatus.NOT_FOUND);
         }
   
       const updateTypeClient = Object.assign(typeClientFound, typeClient)
       return this.typeClientRepository.save(updateTypeClient)
       }
}