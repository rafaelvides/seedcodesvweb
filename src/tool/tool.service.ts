import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tool } from './tool.entity';
import { Repository } from 'typeorm';
import { createToolDto } from './dto/create-tool.dto';
import { updateToolDto } from './dto/update-tool.dto';
import { typeTool } from '../typeTool/typeTool.entity';

@Injectable()
export class toolService {
  constructor(
    @InjectRepository(Tool) private toolRepository: Repository<Tool>,
    @InjectRepository(typeTool) private typeToolRepository: Repository<typeTool>,
  ) {}

  async createTool(tool: createToolDto) {
    try {
      const verifyIdTypeTool = await this.typeToolRepository.findOne({
        where: {id: tool.typeToolId}
      });
      if(!verifyIdTypeTool){
        return{
          ok: false,
          msg: `Invalid typeTool Id: ${tool.typeToolId}`
        }
      }

      const ToolFound = await this.getToolByName(tool.name);

      if (!ToolFound) {
        if (ToolFound.name === tool.name) {
          return {
            ok: false,
            msg: `Name already exists ${ToolFound.name}`,
          };
        }
      }
      this.toolRepository.save(tool);
      return {
        ok: true,
        msg: 'Tool create',
        tool,
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

  async getTools() {
    try {
      const tools = await this.toolRepository.find({
        where: {
          isActive: true,
        },
      });
      if (tools.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          tools,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active Tool found',
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

  async getTool(id: number) {
    try {
      const toolFound = await this.toolRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!toolFound) {
        return {
          ok: false,
          mensaje: 'Tool not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        toolFound,
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

  async getToolByName(name: string) {
    const clientFound = await this.toolRepository.findOne({
      where: [{ name, isActive: true }],
    });

    return clientFound;
  }

  async deleteTool(id: number) {
    try {
      const toolFound = await this.toolRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!toolFound) {
        return {
          ok: false,
          mensaje: 'Tool does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      toolFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.toolRepository.save(toolFound);

      return {
        ok: true,
        msg: 'Tool successfully delete',
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

  async updateTool(id: number, tool: updateToolDto) {
    try {
      const toolFound = await this.toolRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!toolFound) {
        return {
          ok: false,
          mensaje: 'Tool not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateTool = Object.assign(toolFound, tool);
      this.toolRepository.save(updateTool);
      return {
        ok: true,
        msg: 'Tool was update',
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
