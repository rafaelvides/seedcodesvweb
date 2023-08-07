import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { META_ROLE } from 'src/auth/decorators/role-protected.decorator'
import { Role } from 'src/role/role.entity'
import { User } from 'src/user/user.entity'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLE,
      context.getHandler()
    )

    if (!validRoles) return true
    if (validRoles.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user

    if (!user) throw new BadRequestException('User not found')

    const normalizedValidRoles = validRoles.map(role => role.toLowerCase())
    const userRole = user.rol.toLowerCase() // Asegúrate de que el rol del usuario esté almacenado en minúsculas

    if (normalizedValidRoles.includes(userRole)) {
      return true
    }
    throw new ForbiddenException(`You are not authorized to access the route`)
  }
}
