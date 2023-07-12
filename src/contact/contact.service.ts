import {Injectable, HttpException, HttpStatus, Inject} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import {Contact} from './contact.entity'
import { Repository } from 'typeorm';
import {createContactDto} from './dto/create-contact.dto'
import { updateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService{
    constructor(
       @InjectRepository(Contact) private contactRepository: Repository<Contact>
    ){}

    async createContact(Contact: createContactDto){
        const contactFound = await this.contactRepository.findOne({
            where:{
                typeContact: Contact.typeContact
            }
        })

        if(contactFound){
            return new HttpException('contact already exists', HttpStatus.NOT_FOUND)
        }

         const newContact = this.contactRepository.create(Contact)
         return this.contactRepository.save(newContact)
    }

    getContacts(){
        return this.contactRepository.find({
            relations: ['homes']
        })
    }

    getContact(id: number){
        const contactFound = this.contactRepository.findOne({
            where: {
                id
            },
            relations: ['homes']
        })
        if(!contactFound){
            return new HttpException('contact not foound', HttpStatus.NOT_FOUND)
        }
        return contactFound
    }

    async deleteContact(id: number){
        const resul = await this.contactRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateContact(id: number, contact: updateContactDto){
        const contactFound = await this.contactRepository.findOne({
           where: {
               id
           }
        });
        if(!contactFound){
           return new HttpException('contact not found', HttpStatus.NOT_FOUND);
         }
   
       const updateContact = Object.assign(contactFound, contact)
       return this.contactRepository.save(updateContact)
       }
}