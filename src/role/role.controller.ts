import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { RoleService } from './role.service';
import { createRoleDto } from './dto/create-role.dto';
import { Role } from './role.entity';
import { updateRoleDto } from './dto/update-role.dto';

@Controller('RoleC')
export class roleController{
    constructor(private roleService: RoleService){}

    @Post()
    createRole(@Body() newRole: createRoleDto){
        return this.roleService.createRole(newRole)
    }

    @Get()
    getRoles(): Promise<Role[]> {
      return this.roleService.getRoles();
    }

    @Get(':id')
    getRole(@Param('id', ParseIntPipe)  id: number) {
      return this.roleService.getRole(id);
    }

    @Delete('id:')
    deleteRole(@Param('id', ParseIntPipe) id: number) {
      return this.roleService.deleteRole(id)
    }

    @Put(':id')
    updateRole(@Param('id', ParseIntPipe)id: number, @Body() role: updateRoleDto){
      return this.roleService.updateRole(id, role)
    }

}