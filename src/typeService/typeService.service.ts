import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { typeService } from './typeService.entity';
import { Repository } from 'typeorm';
import { createTypeServiceDto } from './dto/create-typeService.dto';
import { updateTypeServiceDto } from './dto/update-typeService.dto';

@Injectable()
export class typeServiceService {
  constructor(
    @InjectRepository(typeService)
    private typeServiceRepository: Repository<typeService>,
  ) {}

  async createTypeService(typeService: createTypeServiceDto) {
    try {
      this.typeServiceRepository.save(typeService);
      return {
        ok: true,
        msg: 'Type service create',
        typeService,
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

  async gettypeServices() {
    try {
      const typeServices = await this.typeServiceRepository.find({
        where: {
          isActive: true,
        },
      });
      if (typeServices.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          typeServices,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active type service found',
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

  async gettypeService(id: number) {
    try {
      const typeServiceFound = await this.typeServiceRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!typeServiceFound) {
        return {
          ok: false,
          mensaje: 'Type service not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        typeServiceFound,
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

  async deleteTypeService(id: number) {
    try {
      const typeServiceFound = await this.typeServiceRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!typeServiceFound) {
        return {
          ok: false,
          mensaje: 'Type service does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      typeServiceFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.typeServiceRepository.save(typeServiceFound);

      return {
        ok: true,
        msg: 'Type service successfully delete',
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

  async updateTypeService(id: number, typeService: updateTypeServiceDto) {
    try {
      const typeServiceFound = await this.typeServiceRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!typeServiceFound) {
        return {
          ok: false,
          mensaje: 'Type service not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateTypeService = Object.assign(typeServiceFound, typeService);
      this.typeServiceRepository.save(updateTypeService);
      return {
        ok: true,
        msg: 'Type service was update',
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
