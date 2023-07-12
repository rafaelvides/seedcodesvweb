import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { toolService } from './tool.service';
import { createToolDto } from './dto/create-tool.dto';
import { Tool } from './tool.entity';
import { updateToolDto } from './dto/update-tool.dto';

@Controller('ToolC')
export class toolController{
    constructor(private toolService: toolService){}

    @Post()
    createTool(@Body() newTool: createToolDto){
        return this.toolService.createTool(newTool)
    }

    @Get()
    getTools(): Promise<Tool[]> {
      return this.toolService.getTools();
    }

    @Get(':id')
    getTool(@Param('id', ParseIntPipe)  id: number) {
      return this.toolService.getTool(id);
    }

    @Delete('id:')
    deleteTool(@Param('id', ParseIntPipe) id: number) {
      return this.toolService.deleteTool(id)
    }

    @Put(':id')
    updateTool(@Param('id', ParseIntPipe)id: number, @Body() tool: updateToolDto){
      return this.toolService.updateTool(id, tool)
    }

}