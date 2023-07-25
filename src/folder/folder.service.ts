import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Folder } from './folder.entity';
import { Repository } from 'typeorm';
import { createFolderDto } from './dto/create-folder.dto';
import { updateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class folderService {
  constructor(
    @InjectRepository(Folder) private folderRepository: Repository<Folder>,
  ) {}

  async createFolder(folder: createFolderDto) {
    try {
      const folderByName = await this.getFolderByName(folder.name);

      if (folderByName) {
        if (folderByName.name === folder.name) {
          return {
            ok: false,
            msg: `Name already exists ${folder.name}`,
          };
        }
      }
      this.folderRepository.save(folder);
      return {
        ok: true,
        msg: 'Folder create',
        folder,
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

  async getFolders() {
    try {
      const folders = await this.folderRepository.find({
        where: { isActive: true },
      });
      if (folders.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          folders,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active folders found',
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

  async getFolder(id: number) {
    try {
      const folderFound = await this.folderRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!folderFound) {
        return {
          ok: false,
          mensaje: 'Folder not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        folderFound,
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

  async getFolderByName(name: string) {
    const folderFound = await this.folderRepository.findOne({
      where: [{ name, isActive: true }],
    });
    return folderFound;
  }

  async deleteFolder(id: number) {
    try {
      const folderFound = await this.folderRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!folderFound) {
        return {
          ok: false,
          mensaje: 'Folder does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      folderFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.folderRepository.save(folderFound);

      return {
        ok: true,
        msg: 'Folder successfully delete',
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

  async updateFolder(id: number, folder: updateFolderDto) {
    try {
      const folderFound = await this.folderRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!folderFound) {
        return {
          ok: false,
          mensaje: 'Folder not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateFolder = Object.assign(folderFound, folder);
      this.folderRepository.save(updateFolder);
      return {
        ok: true,
        msg: 'Folder was update',
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
