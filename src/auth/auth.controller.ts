import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { User } from '../user/user.entity'
import { GetUser } from './decorators/get-user.decorator'
import { ValidRoles } from './interfaces'
import { Auth } from './decorators'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() req): Promise<any> {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password
    )
    return this.authService.login(user)
  }

  @Post('protected')
  @UseGuards(AuthGuard('jwt'))
  async protectedRoute(): Promise<any> {
    return 'Has accedido a una ruta protegida'
  }

  @Get('private2')
  @Auth(ValidRoles.admin)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    }
  }
}
