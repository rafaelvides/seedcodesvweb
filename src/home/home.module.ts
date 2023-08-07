import { Module } from '@nestjs/common/decorators'
import { TypeOrmModule } from '@nestjs/typeorm'
import { homeController } from './home.controller'
import { Home } from './home.entity'
import { homeService } from './home.service'
import { ContactModule } from 'src/contact/contact.module'
import { Contact } from 'src/contact/contact.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Home, Contact]),
    ContactModule,
    AuthModule,
  ],
  controllers: [homeController],
  providers: [homeService],
})
export class HomeModule {}
