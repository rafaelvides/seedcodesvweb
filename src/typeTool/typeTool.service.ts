import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { typeTool } from './typeTool.entity';
import { createTypeToolDto } from './dto/create-typeTool.dto';
import { updateTypeToolDto } from './dto/update-typeTool.dto';

@Injectable()
export class typeToolService {
  constructor(
    @InjectRepository(typeTool)
    private typeToolRepository: Repository<typeTool>,
  ) {}

  async createTypeTool(typeTool: createTypeToolDto) {
    try {
      const typeToolFound = await this.getTypeToolByName(typeTool.type);
      if (typeToolFound) {
        if (typeTool.type === typeTool.type) {
          return {
            ok: false,
            msg: `Name typeTool already exists ${typeTool.type}`,
          };
        }
      }
      this.typeToolRepository.save(typeTool);
      return {
        ok: true,
        msg: 'Type tool create',
        typeTool,
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

  async gettypeTools() {
    try {
      const typeTools = await this.typeToolRepository.find({
        where: {
          isActive: true,
        },
      });
      if (typeTools.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          typeTools,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active type tool found',
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

  async gettypeTool(id: number) {
    try {
      const typeToolFound = this.typeToolRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!typeToolFound) {
        return {
          ok: false,
          mensaje: 'Type tool not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        typeToolFound,
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

  async getTypeToolByName(type: string) {
    const typeToolFound = await this.typeToolRepository.findOne({
      where: [{ type, isActive: true }],
    });

    return typeToolFound;
  }

  async deleteTypeTool(id: number) {
    try {
      const typeToolFound = await this.typeToolRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!typeToolFound) {
        return {
          ok: false,
          mensaje: 'Type tool does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      typeToolFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.typeToolRepository.save(typeToolFound);

      return {
        ok: true,
        msg: 'Type tool successfully delete',
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

  async updateTool(id: number, tool: updateTypeToolDto) {
    try {
      const typeToolFound = await this.typeToolRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!typeToolFound) {
        return {
          ok: false,
          mensaje: 'Type tool not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateTypeTool = Object.assign(typeToolFound, tool);
      this.typeToolRepository.save(updateTypeTool);
      return {
        ok: true,
        msg: 'Type tool was update',
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
