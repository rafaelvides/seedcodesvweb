import { Module } from '@nestjs/common/decorators'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Client } from '../client/client.entity'
import { ClientController } from './client.controller'
import { ClientService } from './client.service'
import { typeClientModule } from '../typeClient/typeClient.module'
import { typeClient } from '../typeClient/typeClient.entity'
import { AuthModule } from '../auth/auth.module'
@Module({
  imports: [
    TypeOrmModule.forFeature([Client, typeClient]),
    typeClientModule,
    AuthModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
