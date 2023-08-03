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
  getProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.getProject(id);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id);
  }

  @Put(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() project: updateProjectDto,
  ) {
    return this.projectService.updateProject(id, project);
  }
}
