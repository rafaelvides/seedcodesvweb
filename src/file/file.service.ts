import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { Repository } from 'typeorm';
import { createFileDto } from './dto/create-file.dto';
import {folderService} from '../folder/folder.service'
import { Folder } from 'src/folder/folder.entity';
import { updateFileDto } from './dto/update-file.dto';

@Injectable()
export class fileService{
    constructor(
      @InjectRepository(File) private fileRepository: Repository<File>,
      private folderService: folderService
    ){}

    async createFile(file: createFileDto){
        const folderFound = await this.folderService.getFolder(file.folderId)

        if(!folderFound) return new HttpException('file already exists', HttpStatus.NOT_FOUND)

        const newFile = this.fileRepository.create(file)
        return this.fileRepository.save(newFile)
    }

    getFiles(){
        return this.fileRepository.find({
            relations: ['FolderC']
        })
    }

    getFile(id: number){
        const fileFound = this.fileRepository.findOne({
            where: {
                id
            },
            relations: ['FolderC']
        })
        if(!fileFound){
            return new HttpException('file not found', HttpStatus.NOT_FOUND)
        }
        return
    }

    async deleteFile(id: number){
        const resul = await this.fileRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('file not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateFile(id: number, file: updateFileDto){
        const fileFound = await this.fileRepository.findOne({
           where: {
               id
           }
        });
        if(!fileFound){
           return new HttpException('file not found', HttpStatus.NOT_FOUND);
         }
   
       const updateFile = Object.assign(fileFound, file)
       return this.fileRepository.save(updateFile)
       }
}