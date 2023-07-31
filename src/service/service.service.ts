import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../service/service.entity';
import { Repository } from 'typeorm';
import { createServiceDto } from './dto/create-service.dto';
import { updateServiceDto } from './dto/update-service.dto';
import {typeService} from '../typeService/typeService.entity'

@Injectable()
export class serviceService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(typeService) private typeServiceRepository: Repository<typeService>
  ) {}

  async createService(service: createServiceDto) {
    try {
      const verifyIdTypeService = await this.typeServiceRepository.findOne({
        where: {id: service.typeServiceId}
      });
      if(!verifyIdTypeService){
        return{
          ok: false,
          msg: `Invalid TypeServiceId: ${service.typeServiceId}`
        }
      }
      this.serviceRepository.save(service);
      return {
        ok: true,
        msg: 'Service create',
        service,
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

  async getServices() {
    try {
      const services = await this.serviceRepository.find({
        where: {
          isActive: true,
        },
      });
      if (services.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          services,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active services found',
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

  async getService(id: number) {
    try {
      const ServiceFound = await this.serviceRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!ServiceFound) {
        return {
          ok: false,
          mensaje: 'Service not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        ServiceFound,
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

  async deleteService(id: number) {
    const serviceFound = await this.serviceRepository.findOne({
      where: {
        id,
        isActive: true,
      },
    });
    if (!serviceFound) {
      return {
        ok: false,
        mensaje: 'Service does not exist in the database',
        status: HttpStatus.NOT_FOUND,
      };
    }
    serviceFound.isActive = false; // Cambiar el estado a 0 (inactivo)
    await this.serviceRepository.save(serviceFound);

    return {
      ok: true,
      msg: 'Service successfully delete',
    };
  }

  async updateService(id: number, service: updateServiceDto) {
    try {
      const serviceFound = await this.serviceRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!serviceFound) {
        return {
          ok: false,
          mensaje: 'Service not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateService = Object.assign(serviceFound, service);
      this.serviceRepository.save(updateService);
      return {
        ok: true,
        msg: 'Service was update',
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
