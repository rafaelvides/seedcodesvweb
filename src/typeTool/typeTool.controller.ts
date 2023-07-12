import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { typeToolService } from './typeTool.service';
import { createTypeToolDto } from './dto/create-typeTool.dto';
import { typeTool } from './typeTool.entity';
import { updateTypeToolDto } from './dto/update-typeTool.dto';

@Controller('typeToolC')
export class typeToolController{
    constructor(private typeToolService: typeToolService){}

    @Post()
    createTypeTool(@Body() newtypeTool: createTypeToolDto){
        return this.typeToolService.createTypeTool(newtypeTool)
    }

    @Get()
    getTypeTools(): Promise<typeTool[]> {
      return this.typeToolService.gettypeTools();
    }

    @Get(':id')
    getTypeTool(@Param('id', ParseIntPipe)  id: number) {
      return this.typeToolService.gettypeTool(id);
    }

    @Delete('id:')
    deleteTypeTool(@Param('id', ParseIntPipe) id: number) {
      return this.typeToolService.deleteTypeTool(id)
    }

    @Put(':id')
    updateTool(@Param('id', ParseIntPipe)id: number, @Body() tool: updateTypeToolDto){
      return this.typeToolService.updateTool(id, tool)
    }

}