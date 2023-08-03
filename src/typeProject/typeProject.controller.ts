import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { typeProjectService } from './typeProject.Service';
import { createTypeProyectDto } from './dto/create-typeProject.dto';
import { typeProject } from './typeProject.entity';
import { updateTypeProjectDto } from './dto/update-typeProject.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('typeProject')
export class typeProjectController {
  constructor(private typeProjectService: typeProjectService) {}

  @Post()
  createTypeProject(@Body() newTypeProject: createTypeProyectDto) {
    return this.typeProjectService.createTypeProyect(newTypeProject);
  }

  @Get()
  getTypeProjects(): Promise<
    | { ok: boolean; typeProjects: typeProject[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.typeProjectService.getTypeProjects();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getTypeProject(@Param('id', ParseIntPipe) id: number) {
    return this.typeProjectService.getTypeProject(id);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteTypeProject(@Param('id', ParseIntPipe) id: number) {
    return this.typeProjectService.deleteTypeProject(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateTypeProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeProject: updateTypeProjectDto,
  ) {
    return this.typeProjectService.updateTypeProject(id, typeProject);
  }
}
