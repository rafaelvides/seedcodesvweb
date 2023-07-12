import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {Service} from './service.entity'
import {serviceController} from './service.controller'
import {serviceService} from "./service.service";
import {typeServiceModule} from '../typeService/typeService.module';

@Module ({
    imports: [TypeOrmModule.forFeature([Service]), typeServiceModule],
    controllers: [serviceController],
    providers: [serviceService],
    
})
export class ServiceModule{}