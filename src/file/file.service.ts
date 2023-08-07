import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { File } from './file.entity'
import { Repository } from 'typeorm'
import { createFileDto } from './dto/create-file.dto'
import { updateFileDto } from './dto/update-file.dto'
import { Folder } from '../folder/folder.entity'

@Injectable()
export class fileService {
  constructor(
    @InjectRepository(File) private fileRepository: Repository<File>,
    @InjectRepository(Folder) private folderRepository: Repository<Folder>
  ) {}

  async createFile(file: createFileDto) {
    try {
      const verifyIdFolder = await this.folderRepository.findOne({
        where: { id: file.folderId },
      })
      if (!verifyIdFolder) {
        return {
          ok: false,
          msg: `Invalid folderId: ${file.folderId}`,
        }
      }

      this.fileRepository.save(file)
      return {
        ok: true,
        msg: 'File create',
        file,
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

  async getFiles() {
    try {
      const files = await this.fileRepository.find({
        where: {
          isActive: true,
        },
      })
      if (files.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          files,
        }
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active file found',
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

  async getFile(id: number) {
    try {
      const fileFound = await this.fileRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!fileFound) {
        return {
          ok: false,
          mensaje: 'File not found',
          status: HttpStatus.NOT_FOUND,
        }
      }
      return {
        ok: true,
        fileFound,
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

  async deleteFile(id: number) {
    try {
      const file = await this.fileRepository.findOne({
        where: { id, isActive: true },
      })
      if (!file) {
        return {
          ok: false,
          mensaje: 'File does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        }
      }
      file.isActive = false // Cambiar el estado a 0 (inactivo)
      await this.fileRepository.save(file)

      return {
        ok: true,
        msg: 'File successfully delete',
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

  async updateFile(id: number, file: updateFileDto) {
    try {
      const fileFound = await this.fileRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      })
      if (!fileFound) {
        return {
          ok: false,
          mensaje: 'File not found',
          status: HttpStatus.NOT_FOUND,
        }
      }
      const updateFile = Object.assign(fileFound, file)
      this.fileRepository.save(updateFile)
      return {
        ok: true,
        msg: 'File was update',
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
