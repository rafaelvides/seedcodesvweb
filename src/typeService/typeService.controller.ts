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
import { typeServiceService } from './typeService.service';
import { createTypeServiceDto } from './dto/create-typeService.dto';
import { typeService } from './typeService.entity';
import { updateTypeServiceDto } from './dto/update-typeService.dto';

@Controller('typeService')
export class typeServiceController {
  constructor(private typeServiceService: typeServiceService) {}

  @Post()
  createTypeService(@Body() newtypeService: createTypeServiceDto) {
    return this.typeServiceService.createTypeService(newtypeService);
  }

  @Get()
  getTypeServices(): Promise<
    | { ok: boolean; typeServices: typeService[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.typeServiceService.gettypeServices();
  }

  @Get(':id')
  getTypeService(@Param('id', ParseIntPipe) id: number) {
    return this.typeServiceService.gettypeService(id);
  }

  @Delete(':id')
  deleteTypeService(@Param('id', ParseIntPipe) id: number) {
    return this.typeServiceService.deleteTypeService(id);
  }

  @Put(':id')
  updateTypeService(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeService: updateTypeServiceDto,
  ) {
    return this.typeServiceService.updateTypeService(id, typeService);
  }
}
