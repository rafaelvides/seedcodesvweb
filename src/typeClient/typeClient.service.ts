import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { typeClient } from './typeClient.entity'
import { Repository } from 'typeorm'
import { CreateTypeClientDto } from './dto/create-typeClient.dto'
import { updateTypeClientDto } from './dto/update-typeClient.dto'
@Injectable()
export class typeClientService {
  constructor(
    @InjectRepository(typeClient)
    private typeClientRepository: Repository<typeClient>
  ) {}

  async createTypeClient(typeClient: CreateTypeClientDto) {
    try {
      const typeClientFound = await this.getTypeClienByName(typeClient.type)
      if (typeClientFound) {
        if (typeClientFound.type === typeClient.type) {
          return {
            ok: false,
            msg: `Name typeClien already exists ${typeClient.type}`,
          }
        }
      }
      this.typeClientRepository.save(typeClient)
      return {
        ok: true,
        msg: 'Tipe Client create',
        typeClient,
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

  async gettypeClients() {
    try {
      const typeClients = await this.typeClientRepository.find({
        where: {
          isActive: true,
        },
      })
      if (typeClients.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          typeClients,
        }
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active type clients found',
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

  async gettypeClient(id: number) {
    try {
      const typeclientFound = await this.typeClientRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!typeclientFound) {
        return {
          ok: false,
          mensaje: 'Type client not found',
          status: HttpStatus.NOT_FOUND,
        }
      }
      return {
        ok: true,
        typeclientFound,
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

  async getTypeClienByName(type: string) {
    const typeClientFound = await this.typeClientRepository.findOne({
      where: [{ type, isActive: true }],
    })

    return typeClientFound
  }

  async deleteTypeClient(id: number) {
    try {
      const typeClientFound = await this.typeClientRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!typeClientFound) {
        return {
          ok: false,
          mensaje: 'Type client does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        }
      }
      typeClientFound.isActive = false // Cambiar el estado a 0 (inactivo)
      await this.typeClientRepository.save(typeClientFound)

      return {
        ok: true,
        msg: 'Type client successfully delete',
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

  async updateTypeClient(id: number, typeClient: updateTypeClientDto) {
    try {
      const typeClientFound = await this.typeClientRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!typeClientFound) {
        return {
          ok: false,
          mensaje: 'Type client not found',
          status: HttpStatus.NOT_FOUND,
        }
      }

      const updateTypeClient = Object.assign(typeClientFound, typeClient)
      this.typeClientRepository.save(updateTypeClient)
      return {
        ok: true,
        msg: 'Type client was update',
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
