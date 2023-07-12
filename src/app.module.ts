import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule}from '@nestjs/typeorm'
import {ClientModule} from './client/client.module'
import {typeClientModule} from './typeClient/typeClient.module'
import {ContactModule} from './contact/contact.module'
import { HomeModule } from './home/home.module';
import { ServiceModule } from './service/service.module';
import { typeServiceModule } from './typeService/typeService.module';
import { FileModule } from './file/file.module';
import { FolderModule } from './folder/folder.module';
import { typeProjectModule } from './typeProject/typeProject.module';
import { ProyectModule } from './project/project.module';
import { ToolModule } from './tool/tool.module';
import { typeToolModule } from './typeTool/typeTool.module';
import { RoleModule } from './role/role.module';
import {UserModule} from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'seedcodesv',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
  ClientModule, typeClientModule, ContactModule, 
  HomeModule, ServiceModule, typeServiceModule,
  FileModule, FolderModule, ToolModule, typeToolModule,
  ProyectModule, typeProjectModule, RoleModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
