import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Proyect } from './project.entity'
import { Repository } from 'typeorm'
import { createProyectDto } from './dto/create-proyect.dto'
import { updateProjectDto } from './dto/update-project.dto'
import { Tool } from '../tool/tool.entity'
import { typeProject } from '../typeProject/typeProject.entity'
import { Client } from '../client/client.entity'
import { User } from '../user/user.entity'

@Injectable()
export class projectService {
  constructor(
    @InjectRepository(Proyect) private projectRepository: Repository<Proyect>,
    @InjectRepository(Tool) private toolRepository: Repository<Tool>,
    @InjectRepository(typeProject)
    private typeProjectRepository: Repository<typeProject>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createProject(project: createProyectDto) {
    try {
      const projectFound = await this.getProjecyByName(project.nameProyect)
      if (projectFound) {
        if (projectFound.nameProyect === project.nameProyect) {
          return {
            ok: false,
            msg: `Name Project already exists ${project.nameProyect}`,
          }
        }
      }
      const verifyIdTool = await this.toolRepository.findOne({
        where: { id: project.toolId },
      })
      if (!verifyIdTool) {
        return {
          ok: false,
          msg: `Invalid toolId: ${project.toolId}`,
        }
      }
      const verifyIdTypeProject = await this.typeProjectRepository.findOne({
        where: { id: project.typeProjectId },
      })
      if (!verifyIdTypeProject) {
        return {
          ok: false,
          msg: `Invalid typeProjectId: ${project.typeProjectId}`,
        }
      }
      const verifyIdclient = await this.clientRepository.findOne({
        where: { id: project.clientId },
      })
      if (!verifyIdclient) {
        return {
          ok: false,
          msg: `Invalid clientId: ${project.clientId}`,
        }
      }
      const verifyIdUser = await this.userRepository.findOne({
        where: { id: project.userId },
      })
      if (!verifyIdUser) {
        return {
          ok: false,
          msg: `Invalid userId: ${project.userId}`,
        }
      }

      this.projectRepository.save(project)
      return {
        ok: true,
        msg: 'Project create',
        project,
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getProjects() {
    try {
      const projects = await this.projectRepository.find({
        where: {
          isActive: true,
        },
      })
      if (projects.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          projects,
        }
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active project found',
        }
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getProject(id: number) {
    try {
      const projectFound = await this.projectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!projectFound) {
        return {
          ok: false,
          mensaje: 'Project not found',
          status: HttpStatus.NOT_FOUND,
        }
      }
      return {
        ok: true,
        projectFound,
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getProjecyByName(nameProyect: string) {
    const projectFound = await this.projectRepository.findOne({
      where: [{ nameProyect, isActive: true }],
    })

    return projectFound
  }

  async deleteProject(id: number) {
    try {
      const projectFound = await this.projectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!projectFound) {
        return {
          ok: false,
          mensaje: 'Project does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        }
      }
      projectFound.isActive = false // Cambiar el estado a 0 (inactivo)
      await this.projectRepository.save(projectFound)

      return {
        ok: true,
        msg: 'Project successfully delete',
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async updateProject(id: number, project: updateProjectDto) {
    try {
      const projectFound = await this.projectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!projectFound) {
        return {
          ok: false,
          mensaje: 'Project not found',
          status: HttpStatus.NOT_FOUND,
        }
      }

      const updateProject = Object.assign(projectFound, project)
      this.projectRepository.save(updateProject)
      return {
        ok: true,
        msg: 'Project was update',
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
