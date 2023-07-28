import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientModule } from './client/client.module';
import { typeClientModule } from './typeClient/typeClient.module';
import { ContactModule } from './contact/contact.module';
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
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import {Role} from './role/role.entity'
import * as dotenv from 'dotenv'; 
import { APP_GUARD } from '@nestjs/core';
import {RolesGuard} from './auth/roles.guard'

dotenv.config();
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      // otras opciones de configuración...
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Role]),
    ClientModule,
    typeClientModule,
    ContactModule,
    HomeModule,
    ServiceModule,
    typeServiceModule,
    FileModule,
    FolderModule,
    ToolModule,
    typeToolModule,
    ProyectModule,
    typeProjectModule,
    RoleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('auth/login').forRoutes('*');
  }
}
