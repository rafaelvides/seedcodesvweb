import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeService } from './typeService.entity'
import { typeServiceService } from './typeService.service'
import { typeServiceController } from './typeService.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([typeService]), AuthModule],
  providers: [typeServiceService],
  controllers: [typeServiceController],
  exports: [typeServiceService],
})
export class typeServiceModule {}
