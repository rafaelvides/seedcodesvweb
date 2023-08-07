import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeClient } from './typeClient.entity'
import { typeClientService } from './typeClient.service'
import { typeClientController } from './typeClient.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([typeClient]), AuthModule],
  providers: [typeClientService],
  controllers: [typeClientController],
  exports: [typeClientService],
})
export class typeClientModule {}
