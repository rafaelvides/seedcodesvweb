import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { createRoleDto } from './dto/create-role.dto';
import { Repository } from 'typeorm';
import { updateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private RoleRepository: Repository<Role>,
  ) {}
  //prueba
  async findAllRoles(): Promise<Role[]> {
    return this.RoleRepository.find();
  }

  async createRole(Role: createRoleDto) {
    try {
      this.RoleRepository.save(Role);
      return {
        ok: true,
        msg: 'Role create',
        Role,
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

  async getRoles() {
    try {
      const roles = await this.RoleRepository.find({
        where: { isActive: true },
      });
      if (roles.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          roles,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active role found',
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

  async getRole(id: number) {
    try {
      const RoleFound = await this.RoleRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!RoleFound) {
        return {
          ok: false,
          mensaje: 'Role not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        RoleFound,
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

  async deleteRole(id: number) {
    try {
      const roleFound = await this.RoleRepository.findOne({
        where: { isActive: true },
      });
      if (!roleFound) {
        return {
          ok: false,
          mensaje: 'Role does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      roleFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.RoleRepository.save(roleFound);

      return {
        ok: true,
        msg: 'Role successfully delete',
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

  async updateRole(id: number, role: updateRoleDto) {
    try {
      const roleFound = await this.RoleRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!roleFound) {
        return {
          ok: false,
          mensaje: 'Role not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateRole = Object.assign(roleFound, role);
      this.RoleRepository.save(updateRole);
      return {
        ok: true,
        msg: 'Role was update',
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
