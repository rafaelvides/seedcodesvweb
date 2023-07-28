// roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Si no se especifican roles, permitir el acceso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.roles) {
      return false; // Si el usuario no está autenticado o no tiene roles, denegar el acceso
    }

    return this.matchRoles(roles, user.roles);
  }

  private matchRoles(allowedRoles: string[], userRoles: string[]): boolean {
    // Verificar si hay al menos un rol que coincida entre los roles requeridos y los roles del usuario
    return allowedRoles.some((role) => userRoles.includes(role));
  }
}
