import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { createRoleDto } from './dto/create-role.dto'
import { Role } from './role.entity'
import { updateRoleDto } from './dto/update-role.dto'
import { Auth } from '../auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('Role')
export class roleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @Auth(ValidRoles.admin)
  createRole(@Body() newRole: createRoleDto) {
    return this.roleService.createRole(newRole)
  }

  @Get()
  @Auth(ValidRoles.admin)
  getRoles(): Promise<
    { ok: boolean; roles: Role[]; msg?: string } | { ok: boolean; msg: string }
  > {
    return this.roleService.getRoles()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.getRole(id)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteRole(@Param('id', ParseIntPipe) id: number) {
    return this.roleService.deleteRole(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: updateRoleDto
  ) {
    return this.roleService.updateRole(id, role)
  }
}
