import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { Home } from './home.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {ContactService} from '../contact/contact.service'
import { createHomeDto } from './dto/create-home.dto';
import { updateHomeDto } from './dto/update-home.dto';

@Injectable()
export class homeService{
    constructor(@InjectRepository(Home) private homeRepository: Repository<Home>,
    private contactoService: ContactService
    ){}

    async createHome(home: createHomeDto){
        const contactFound = await this.contactoService.getContact(home.contactId)

        if(!contactFound) return new HttpException('Home already exists', HttpStatus.NOT_FOUND)
        
        const newHome = this.homeRepository.create(home)
        return this.homeRepository.save(newHome)
    }

    getHomes(){
        return this.homeRepository.find({
            relations: ['ContactC']
        })
    }

    getHome(id: number){
        const homeFound = this.homeRepository.findOne({
            where: {
                id
            },
            relations: ['ContactC']
        })
        if(!homeFound){
            return new HttpException('Home npt found', HttpStatus.NOT_FOUND)
        }
        return homeFound
    }

    async deleteHome(id: number){
        const resul = await this.homeRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateHome(id: number, home: updateHomeDto){
        const homeFound = await this.homeRepository.findOne({
           where: {
               id
           }
        });
        if(!homeFound){
           return new HttpException('home not found', HttpStatus.NOT_FOUND);
         }
   
       const updateHome = Object.assign(homeFound, home)
       return this.homeRepository.save(updateHome)
       }
}