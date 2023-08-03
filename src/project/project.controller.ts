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
import { projectService } from './project.service';
import { createProyectDto } from './dto/create-proyect.dto';
import { Proyect } from './project.entity';
import { updateProjectDto } from './dto/update-project.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('Project')
export class projectController {
  constructor(private projectService: projectService) {}

  @Post()
  createProject(@Body() newProject: createProyectDto) {
    return this.projectService.createProject(newProject);
  }

  @Get()
  getProjects(): Promise<
    | { ok: boolean; projects: Proyect[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.projectService.getProjects();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() project: updateProjectDto,
  ) {
    return this.projectService.updateProject(id, project);
  }
}
