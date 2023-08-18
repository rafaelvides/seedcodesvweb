import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const { email, password } = request.body // Asegúrate de ajustar esto según la estructura de tus solicitudes

    // Llama a la función validateUser del AuthService para autenticar la solicitud
    const user = this.authService.validateUser(email, password)

    // Si la función validateUser no arroja una excepción, la solicitud es válida
    return !!user
  }
}
