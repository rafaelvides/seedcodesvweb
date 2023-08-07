import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { createTypeProyectDto } from './dto/create-typeProject.dto'
import { typeProject } from './typeProject.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { updateTypeProjectDto } from './dto/update-typeProject.dto'

@Injectable()
export class typeProjectService {
  constructor(
    @InjectRepository(typeProject)
    private typeProjectRepository: Repository<typeProject>
  ) {}

  async createTypeProyect(typeProject: createTypeProyectDto) {
    try {
      const typeProjectFound = await this.getTypeProjectByName(typeProject.type)
      if (typeProjectFound) {
        if (typeProjectFound.type === typeProject.type) {
          return {
            ok: false,
            msg: `Name typeProject already exists ${typeProject.type}`,
          }
        }
      }
      this.typeProjectRepository.save(typeProject)
      return {
        ok: true,
        msg: 'Type Project create',
        typeProject,
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

  async getTypeProjects() {
    try {
      const typeProjects = await this.typeProjectRepository.find({
        where: {
          isActive: true,
        },
      })
      if (typeProjects.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          typeProjects,
        }
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active type projects found',
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

  async getTypeProject(id: number) {
    try {
      const typeProjectFound = await this.typeProjectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!typeProjectFound) {
        return {
          ok: false,
          mensaje: 'Type project not found',
          status: HttpStatus.NOT_FOUND,
        }
      }
      return {
        ok: true,
        typeProjectFound,
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

  async getTypeProjectByName(type: string) {
    const typeProjectFound = await this.typeProjectRepository.findOne({
      where: [{ type, isActive: true }],
    })

    return typeProjectFound
  }

  async deleteTypeProject(id: number) {
    try {
      const typeProjectFound = await this.typeProjectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!typeProjectFound) {
        return {
          ok: false,
          mensaje: 'Type project does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        }
      }
      typeProjectFound.isActive = false // Cambiar el estado a 0 (inactivo)
      await this.typeProjectRepository.save(typeProjectFound)

      return {
        ok: true,
        msg: 'Type project successfully delete',
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

  async updateTypeProject(id: number, typeProject: updateTypeProjectDto) {
    try {
      const typeProjectFound = await this.typeProjectRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!typeProjectFound) {
        return {
          ok: false,
          mensaje: 'Type project not found',
          status: HttpStatus.NOT_FOUND,
        }
      }

      const updateTypeProject = Object.assign(typeProjectFound, typeProject)
      this.typeProjectRepository.save(updateTypeProject)
      return {
        ok: true,
        msg: 'Type project was update',
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
