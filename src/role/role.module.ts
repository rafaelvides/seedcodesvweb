import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Role} from './role.entity'
import {RoleService} from './role.service'
import {roleController} from './role.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService],
    controllers: [roleController],
    exports: [RoleService]
})
export class RoleModule {}