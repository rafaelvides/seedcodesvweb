import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Home } from './home.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { createHomeDto } from './dto/create-home.dto'
import { updateHomeDto } from './dto/update-home.dto'
import { Contact } from '../contact/contact.entity'

@Injectable()
export class homeService {
  constructor(
    @InjectRepository(Home) private homeRepository: Repository<Home>,
    @InjectRepository(Contact) private contactRepository: Repository<Contact>
  ) {}

  async createHome(home: createHomeDto) {
    try {
      this.homeRepository.save(home)
      return {
        ok: true,
        msg: 'Home create',
        home,
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

  async getHomes() {
    try {
      const homes = await this.homeRepository.find({
        where: {
          isActive: true,
        },
      })
      if (homes.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          homes,
        }
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active home found',
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

  async getHome(id: number) {
    try {
      const homeFound = await this.homeRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!homeFound) {
        return {
          ok: false,
          mensaje: 'Home not found',
          status: HttpStatus.NOT_FOUND,
        }
      }
      return {
        ok: true,
        homeFound,
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

  async deleteHome(id: number) {
    try {
      const homeFound = await this.homeRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!homeFound) {
        return {
          ok: false,
          mensaje: 'Home does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        }
      }
      homeFound.isActive = false // Cambiar el estado a 0 (inactivo)
      await this.homeRepository.save(homeFound)

      return {
        ok: true,
        msg: 'Home successfully delete',
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

  async updateHome(id: number, home: updateHomeDto) {
    try {
      const homeFound = await this.homeRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!homeFound) {
        return {
          ok: false,
          mensaje: 'Home not found',
          status: HttpStatus.NOT_FOUND,
        }
      }

      const updateHome = Object.assign(homeFound, home)
      this.homeRepository.save(updateHome)
      return {
        ok: true,
        msg: 'Home was update',
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
