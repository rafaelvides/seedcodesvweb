import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { typeServiceService } from './typeService.service';
import { createTypeServiceDto } from './dto/create-typeService.dto';
import { typeService } from './typeService.entity';
import { updateServiceDto } from 'src/service/dto/update-service.dto';
import { updateTypeServiceDto } from './dto/update-typeService.dto';

@Controller('typeServiceC')
export class typeServiceController{
    constructor(private typeServiceService: typeServiceService){}

    @Post()
    createTypeService(@Body() newtypeService: createTypeServiceDto){
        return this.typeServiceService.createTypeService(newtypeService)
    }

    @Get()
    getTypeServices(): Promise<typeService[]> {
      return this.typeServiceService.gettypeServices();
    }

    @Get(':id')
    getTypeService(@Param('id', ParseIntPipe)  id: number) {
      return this.typeServiceService.gettypeService(id);
    }

    @Delete('id:')
    deleteTypeService(@Param('id', ParseIntPipe) id: number) {
      return this.typeServiceService.deleteTypeService(id)
    }

    @Put(':id')
    updateTypeService(@Param('id', ParseIntPipe)id: number, @Body() typeService: updateTypeServiceDto){
      return this.typeServiceService.updateTypeService(id, typeService)
    }

}