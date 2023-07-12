import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { Repository } from 'typeorm';
import { createFolderDto } from './dto/create-folder.dto';
import { updateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class folderService{
    constructor(
        @InjectRepository(Folder) private folderRepository: Repository<Folder>
    ){}

    async createFolder(folder: createFolderDto){
        const folderFound = await this.folderRepository.findOne({
            where: {
                name: Folder.name
            }
        })
        if(folderFound){
            return new HttpException('Folder already exists', HttpStatus.NOT_FOUND)
        }
        const newFolder = this.folderRepository.create(folder)
        return this.folderRepository.save(newFolder)
    }

    getFolders(){
        return this.folderRepository.find({
            relations: ['files']
        })
    }

    getFolder(id: number){
        const folderFound = this.folderRepository.findOne({
            where: {
                id
            },
            relations: ['files']
        })
        if(!folderFound){
            return new HttpException('Folder not found', HttpStatus.NOT_FOUND)
        }
        return folderFound
    }

    async deleteFolder(id: number){
        const resul = await this.folderRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateFolder(id: number, folder: updateFolderDto){
        const folderFound = await this.folderRepository.findOne({
           where: {
               id
           }
        });
        if(!folderFound){
           return new HttpException('folder not found', HttpStatus.NOT_FOUND);
         }
   
       const updateFolder = Object.assign(folderFound, folder)
       return this.folderRepository.save(updateFolder)
       }
}