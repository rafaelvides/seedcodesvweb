import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {Client} from '../client/client.entity'
import { ClientController} from './client.controller'
import { ClientService } from "./client.service"
import { typeClientModule } from "src/typeClient/typeClient.module";
import { typeClient } from "src/typeClient/typeClient.entity";
@Module ({
    imports: [TypeOrmModule.forFeature([Client, typeClient]), typeClientModule],
    controllers: [ClientController],
    providers: [ClientService],
    
})
export class ClientModule{}