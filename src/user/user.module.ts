import { Module } from '@nestjs/common/decorators'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { userController } from './user.controller'
import { userService } from './user.service'
import { RoleModule } from '../role/role.module'
import { Role } from '../role/role.entity'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), PassportModule,RoleModule, AuthModule],
  controllers: [userController],
  providers: [userService],
})
export class UserModule {}
