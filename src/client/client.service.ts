import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { Repository } from 'typeorm';
import {CreateClientDto} from '../client/dto/create-client.dto'
import { typeClientService} from 'src/typeClient/typeClient.service';
import { updateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
    constructor(@InjectRepository(Client) private clientRepository: Repository<Client>,
    private typeClientService: typeClientService
    ){}

    async createClient(client1: CreateClientDto){
        const typeclientFound = await this.typeClientService.gettypeClient(client1.tipeId)
           
        if(!typeclientFound) return new HttpException('Clien already exists', HttpStatus.NOT_FOUND)

        const newClient = this.clientRepository.create(client1)
        return this.clientRepository.save(newClient)
    }

    getClients(){
        return this.clientRepository.find({
        })
    }

    getClient(id: number){
        const clientFound = this.clientRepository.findOne({
            where:{
                id
            },
        })
        if(!clientFound){
            return new HttpException('Client not found',HttpStatus.NOT_FOUND)
        }
        return clientFound
    }

    async deleteClient(id: number){
        const resul = await this.clientRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateClient(id: number, client: updateClientDto){
        const clientFound = await this.clientRepository.findOne({
           where: {
               id
           }
        });
        if(!clientFound){
           return new HttpException('client not found', HttpStatus.NOT_FOUND);
         }
   
       const updateClient = Object.assign(clientFound, client)
       return this.clientRepository.save(updateClient)
       }

}