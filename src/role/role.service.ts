import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { createRoleDto } from './dto/create-role.dto';
import { Repository } from 'typeorm';
import { updateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService{
    constructor(
        @InjectRepository(Role) private RoleRepository: Repository<Role>
    ){}
    
    async createRole(Role: createRoleDto){
        const RoleFound = await this.RoleRepository.findOne({
            where:{
                rol: Role.rol
            }
        })
        if(RoleFound){
            return new HttpException('rol already exists', HttpStatus.NOT_FOUND)
        }
        const newRole = this.RoleRepository.create(Role)
        return this.RoleRepository.save(newRole)
    }

    getRoles(){
        return this.RoleRepository.find({
            relations: ['users']
        })
    }

    getRole(id: number){
        const RoleFound = this.RoleRepository.findOne({
            where: {
                id
            },
            relations: ['users']
        })
        if(!RoleFound){
            return new HttpException('Role not found', HttpStatus.NOT_FOUND)
        }
        return RoleFound
    }

    async deleteRole(id: number){
        const resul = await this.RoleRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async updateRole(id: number, role: updateRoleDto){
        const roleFound = await this.RoleRepository.findOne({
           where: {
               id
           }
        });
        if(!roleFound){
           return new HttpException('role not found', HttpStatus.NOT_FOUND);
         }
   
       const updateRole = Object.assign(roleFound, role)
       return this.RoleRepository.save(updateRole)
       }
}