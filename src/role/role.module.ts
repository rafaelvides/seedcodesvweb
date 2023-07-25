import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Role} from './role.entity'
import {RoleService} from './role.service'
import {roleController} from './role.controller'
import { RolesGuard } from './roles.guard'

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    providers: [RoleService, RolesGuard ],
    controllers: [roleController],
    exports: [RoleService]
})
export class RoleModule {}