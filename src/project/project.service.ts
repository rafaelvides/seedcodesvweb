import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyect } from '../project/project..entity';
import { Repository } from 'typeorm';
import { createProyectDto } from './dto/create-proyect.dto';
import { updateProjectDto } from './dto/update-project.dto';

@Injectable()
export class projectService {
  constructor(
    @InjectRepository(Proyect) private projectRepository: Repository<Proyect>,
  ) {}

  async createProject(project: createProyectDto) {
    try {
      const ProjectFound = await this.getProjecyByName(project.nameProyect);
      if (ProjectFound) {
        if (ProjectFound.nameProyect === project.nameProyect) {
          return {
            ok: false,
            msg: `Name Project already exists ${project.nameProyect}`,
          };
        }
      }

      this.projectRepository.save(project);
      return {
        ok: true,
        msg: 'Project create',
        project,
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjects() {
    try {
      const projects = await this.projectRepository.find({
        where: {
          isActive: true,
        },
      });
      if (projects.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          projects,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active project found',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProject(id: number) {
    try {
      const projectFound = await this.projectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!projectFound) {
        return {
          ok: false,
          mensaje: 'Project not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        projectFound,
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjecyByName(nameProyect: string) {
    const projectFound = await this.projectRepository.findOne({
      where: [{ nameProyect, isActive: true }],
    });

    return projectFound;
  }

  async deleteProject(id: number) {
    try {
      const projectFound = await this.projectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!projectFound) {
        return {
          ok: false,
          mensaje: 'Project does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      projectFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.projectRepository.save(projectFound);

      return {
        ok: true,
        msg: 'Project successfully delete',
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateProject(id: number, project: updateProjectDto) {
    try {
      const projectFound = await this.projectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!projectFound) {
        return {
          ok: false,
          mensaje: 'Project not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateProject = Object.assign(projectFound, project);
      this.projectRepository.save(updateProject);
      return {
        ok: true,
        msg: 'Project was update',
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
