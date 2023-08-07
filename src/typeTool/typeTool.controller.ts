import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common'
import { typeToolService } from './typeTool.service'
import { createTypeToolDto } from './dto/create-typeTool.dto'
import { typeTool } from './typeTool.entity'
import { updateTypeToolDto } from './dto/update-typeTool.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('typeTool')
export class typeToolController {
  constructor(private typeToolService: typeToolService) {}

  @Post()
  @Auth(ValidRoles.admin)
  createTypeTool(@Body() newtypeTool: createTypeToolDto) {
    return this.typeToolService.createTypeTool(newtypeTool)
  }

  @Get()
  @Auth(ValidRoles.admin)
  getTypeTools(): Promise<
    | { ok: boolean; typeTools: typeTool[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.typeToolService.gettypeTools()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getTypeTool(@Param('id', ParseIntPipe) id: number) {
    return this.typeToolService.gettypeTool(id)
  }

  @Delete('id:')
  @Auth(ValidRoles.admin)
  deleteTypeTool(@Param('id', ParseIntPipe) id: number) {
    return this.typeToolService.deleteTypeTool(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateTool(
    @Param('id', ParseIntPipe) id: number,
    @Body() tool: updateTypeToolDto
  ) {
    return this.typeToolService.updateTool(id, tool)
  }
}
