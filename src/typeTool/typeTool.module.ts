import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeTool } from './typeTool.entity'
import { typeToolService } from './typeTool.service'
import { typeToolController } from './typeTool.controller'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([typeTool]), AuthModule],
  providers: [typeToolService],
  controllers: [typeToolController],
  exports: [typeToolService],
})
export class typeToolModule {}
