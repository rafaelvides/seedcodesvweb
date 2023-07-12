import { Module } from "@nestjs/common/decorators";
import {TypeOrmModule} from '@nestjs/typeorm'
import {homeController} from './home.controller'
import {Home} from './home.entity'
import {homeService} from "./home.service";
import {ContactModule} from "src/contact/contact.module";

@Module ({
    imports: [TypeOrmModule.forFeature([Home]), ContactModule],
    controllers: [homeController],
    providers: [homeService],
    
})
export class HomeModule{}