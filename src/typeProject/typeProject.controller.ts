import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { typeProjectService } from './typeProject.Service';
import { createTypeProyectDto } from './dto/create-typeProject.dto';
import { typeProject } from './typeProject.entity';
import { updateTypeProjectDto } from './dto/update-typeProject.dto';

@Controller('typeProjectC')
export class typeProjectController{
    constructor(private typeProjectService: typeProjectService){}

    @Post()
    createTypeProject(@Body() newTypeProject: createTypeProyectDto){
        return this.typeProjectService.createTypeProyect(newTypeProject)
    }
    
    @Get()
    getTypeProjects(): Promise<typeProject[]> {
      return this.typeProjectService.getTypeProjects();
    }

    @Get(':id')
    getTypeProject(@Param('id', ParseIntPipe)  id: number) {
      return this.typeProjectService.getTypeProject(id);
    }

    @Delete('id:')
    deleteTypeProject(@Param('id', ParseIntPipe) id: number) {
      return this.typeProjectService.deleteTypeProject(id)
    }

    @Put(':id')
    updateTypeProject(@Param('id', ParseIntPipe)id: number, @Body() typeProject: updateTypeProjectDto){
      return this.typeProjectService.updateTypeProject(id, typeProject)
    }

}