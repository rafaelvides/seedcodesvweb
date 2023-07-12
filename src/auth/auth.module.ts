import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import {userService} from '../user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from '../user/user.entity'
import {RoleService} from '../role/role.service'
import {Role} from '../role/role.entity'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [AuthService, userService, RoleService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
