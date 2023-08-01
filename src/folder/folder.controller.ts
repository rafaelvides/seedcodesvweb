import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { folderService } from './folder.service';
import { createFolderDto } from './dto/create-folder.dto';
import { Folder } from './folder.entity';
import { updateFolderDto } from './dto/update-folder.dto';

@Controller('Folder')
export class folderController {
  constructor(private folderSerice: folderService) {}

  @Post()
  createFolder(@Body() newFolder: createFolderDto) {
    return this.folderSerice.createFolder(newFolder);
  }

  @Get()
  async getFolders(): Promise<
    | { ok: boolean; folders: Folder[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.folderSerice.getFolders();
  }

  @Get(':id')
  getFolder(@Param('id', ParseIntPipe) id: number) {
    return this.folderSerice.getFolder(id);
  }

  @Delete(':id')
  deleteFolder(@Param('id', ParseIntPipe) id: number) {
    return this.folderSerice.deleteFolder(id);
  }

  @Put(':id')
  updateFolder(
    @Param('id', ParseIntPipe) id: number,
    @Body() folder: updateFolderDto,
  ) {
    return this.folderSerice.updateFolder(id, folder);
  }
}
