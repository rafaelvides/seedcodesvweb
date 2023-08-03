import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { userService } from '../user/user.service'; // Importa el servicio de la base de datos de usuarios
import { User } from '../user/user.entity'; // Importa el modelo de usuario
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: userService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Email credentials');
    }

    const isPasswordValid = await compare(password, user.password);
    if (isPasswordValid) {
      return user;
    }

    throw new UnauthorizedException('Invalid Password credentials');
  }

  async login(user: User): Promise<any> {
    const payload = { email: user.email, sub: user.id, rolId: user.Role.rol };


    //const rol =  await this.roleService.findByRoleId(user.roleId)
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        lastname: user.lastname,
        email: user.email,
        rolId: user.Role.rol
      },
    };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }
}
