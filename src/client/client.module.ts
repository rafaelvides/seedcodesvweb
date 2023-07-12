import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {Client} from '../client/client.entity'
import { ClientController} from './client.controller'
import { ClientService } from "./client.service"
import { typeClientModule } from "src/typeClient/typeClient.module";

@Module ({
    imports: [TypeOrmModule.forFeature([Client]), typeClientModule],
    controllers: [ClientController],
    providers: [ClientService],
    
})
export class ClientModule{}