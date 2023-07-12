import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { RoleService } from '../role/role.service';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class userService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
     private roleService: RoleService
    ){}

    async createUser(user: createUserDto) {
        const roleFound = await this.roleService.getRole(user.roleId);
    
        if (!roleFound) {
          throw new HttpException('User already exists', HttpStatus.NOT_FOUND);
        }
    
        const hashedPassword = await hash(user.password, 10); // Encripta la contraseña
    
        const newUser = this.userRepository.create({
          lastname: user.lastname,
          email: user.email,
          password: hashedPassword,
          roleId: user.roleId,
        });
    
        return this.userRepository.save(newUser);
    }

    getUsers(){
        return this.userRepository.find({
            
        })
    }

    getUser(id: number){
        const userFound = this.userRepository.findOne({
            where: {
                id
            },
          
        })
        if(!userFound){
            return new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        return userFound
    }

    async deleteUser(id: number){
        const resul = await this.userRepository.delete({id})
            if(resul.affected === 0){
                return new HttpException('Client not found', HttpStatus.NOT_FOUND)
            }
        return resul
    }

    async findByUsername(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where:{email} });
    }

    async updateUser(id: number, user: updateUserDto){
        const userFound = await this.userRepository.findOne({
           where: {
               id
           }
        });
        if(!userFound){
           return new HttpException('user not found', HttpStatus.NOT_FOUND);
         }
   
       const updateUser = Object.assign(userFound, user)
       return this.userRepository.save(updateUser)
    }

       
}