import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {User} from './user.entity'
import {userController} from './user.controller'
import {userService} from "./user.service";
import {RoleModule} from "../role/role.module";
import { Role } from "src/role/role.entity";
import { AuthModule } from "src/auth/auth.module";

@Module ({
    imports: [TypeOrmModule.forFeature([User, Role]), RoleModule, AuthModule],
    controllers: [userController],
    providers: [userService],
    
})
export class UserModule{}