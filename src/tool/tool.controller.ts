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
import { toolService } from './tool.service'
import { createToolDto } from './dto/create-tool.dto'
import { Tool } from './tool.entity'
import { updateToolDto } from './dto/update-tool.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('Tool')
export class toolController {
  constructor(private toolService: toolService) {}

  @Post()
  createTool(@Body() newTool: createToolDto) {
    return this.toolService.createTool(newTool)
  }

  @Get()
  getTools(): Promise<
    { ok: boolean; tools: Tool[]; msg?: string } | { ok: boolean; msg: string }
  > {
    return this.toolService.getTools()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getTool(@Param('id', ParseIntPipe) id: number) {
    return this.toolService.getTool(id)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteTool(@Param('id', ParseIntPipe) id: number) {
    return this.toolService.deleteTool(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateTool(
    @Param('id', ParseIntPipe) id: number,
    @Body() tool: updateToolDto
  ) {
    return this.toolService.updateTool(id, tool)
  }
}
