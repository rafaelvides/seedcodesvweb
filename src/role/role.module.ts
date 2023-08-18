import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Role } from './role.entity'
import { RoleService } from './role.service'
import { roleController } from './role.controller'
import { AuthModule } from '../auth/auth.module'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [TypeOrmModule.forFeature([Role]), PassportModule,AuthModule],
  providers: [RoleService],
  controllers: [roleController],
  exports: [RoleService],
})
export class RoleModule {}
