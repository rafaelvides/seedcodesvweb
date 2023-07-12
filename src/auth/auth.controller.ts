import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<any> {
    const user = await this.authService.validateUser(req.body.email, req.body.password);
    return this.authService.login(user);
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute(): Promise<any> {
    return 'Has accedido a una ruta protegida';
  }
}
