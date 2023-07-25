import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Role} from '../role/role.entity';
import { RoleService } from './role.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private rolService: RoleService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>('Role', context.getHandler());
    if (!requiredRoles) {
      return true; // No se ha especificado ningún rol requerido, se permite el acceso
    }

    const { user } = context.switchToHttp().getRequest();
    const userRoles = await this.rolService.getRoles();

    //const userRoleNames = userRoles.map((role) => role.rol);
    //return requiredRoles.some((role) => userRoleNames.includes(role)); // Verifica si el usuario tiene al menos uno de los roles requeridos
  }
}
