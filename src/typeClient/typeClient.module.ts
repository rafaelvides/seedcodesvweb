import {Module} from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeClient } from './typeClient.entity'
import { typeClientService } from './typeClient.service'
import { typeClientController } from './typeClient.controller'

@Module({
    imports: [TypeOrmModule.forFeature([typeClient])],
    providers: [typeClientService],
    controllers: [typeClientController],
    exports: [typeClientService]
})
export class typeClientModule {}