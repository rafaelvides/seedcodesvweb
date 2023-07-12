import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { fileService } from './file.service';
import { createFileDto } from './dto/create-file.dto';
import { File } from './file.entity';
import { updateFileDto } from './dto/update-file.dto';

@Controller('FileC')
export class fileController{
    constructor(private fileService: fileService){}

    @Post()
    createFile(@Body() newFile: createFileDto){
        return this.fileService.createFile(newFile)
    }

    @Get()
    getFiles(): Promise<File[]> {
      return this.fileService.getFiles();
    }

    @Get(':id')
    getFile(@Param('id', ParseIntPipe)  id: number) {
      return this.fileService.getFile(id);
    }

    @Delete(':id')
    deleteFile(@Param('id', ParseIntPipe) id: number) {
      return this.fileService.deleteFile(id)
    }

    @Put(':id')
    updateFile(@Param('id', ParseIntPipe)id: number, @Body() file: updateFileDto){
      return this.fileService.updateFile(id, file)
    }

}