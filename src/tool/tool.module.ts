import { Module } from '@nestjs/common/decorators'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tool } from './tool.entity'
import { toolController } from './tool.controller'
import { toolService } from './tool.service'
import { typeToolModule } from 'src/typeTool/typeTool.module'
import { typeTool } from 'src/typeTool/typeTool.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tool, typeTool]),
    typeToolModule,
    AuthModule,
  ],
  controllers: [toolController],
  providers: [toolService],
})
export class ToolModule {}
