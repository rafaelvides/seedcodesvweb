import { Module } from '@nestjs/common/decorators'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './service.entity'
import { serviceController } from './service.controller'
import { serviceService } from './service.service'
import { typeServiceModule } from '../typeService/typeService.module'
import { typeService } from 'src/typeService/typeService.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Service, typeService]),
    typeServiceModule,
    AuthModule,
  ],
  controllers: [serviceController],
  providers: [serviceService],
})
export class ServiceModule {}
