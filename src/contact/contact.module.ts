import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {Contact} from './contact.entity'
import {ContactService} from './contact.service'
import {contactController} from './contact.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Contact])],
    providers: [ContactService],
    controllers: [contactController],
    exports: [ContactService]
})
export class ContactModule{}