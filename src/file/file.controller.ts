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
import { fileService } from './file.service'
import { createFileDto } from './dto/create-file.dto'
import { File } from './file.entity'
import { updateFileDto } from './dto/update-file.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('File')
export class fileController {
  constructor(private fileService: fileService) {}

  @Post()
  createFile(@Body() newFile: createFileDto) {
    return this.fileService.createFile(newFile)
  }

  @Get()
  @Auth(ValidRoles.admin)
  async getClients(): Promise<
    { ok: boolean; files: File[]; msg?: string } | { ok: boolean; msg: string }
  > {
    return this.fileService.getFiles()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.getFile(id)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteFile(@Param('id', ParseIntPipe) id: number) {
    return this.fileService.deleteFile(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateFile(
    @Param('id', ParseIntPipe) id: number,
    @Body() file: updateFileDto
  ) {
    return this.fileService.updateFile(id, file)
  }
}
