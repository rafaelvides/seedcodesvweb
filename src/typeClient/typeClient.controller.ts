import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTypeClientDto } from './dto/create-typeClient.dto';
import { typeClientService } from './typeClient.service';
import { typeClient } from './typeClient.entity';
import { updateTypeClientDto } from './dto/update-typeClient.dto';

@Controller('typeClient')
export class typeClientController {
  constructor(private typeclientService: typeClientService) {}

  @Post()
  createTypeClient(@Body() newtypeClient: CreateTypeClientDto) {
    return this.typeclientService.createTypeClient(newtypeClient);
  }

  @Get()
  getTypeClients(): Promise<
    | { ok: boolean; typeClients: typeClient[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.typeclientService.gettypeClients();
  }

  @Get(':id')
  getTypeClient(@Param('id', ParseIntPipe) id: number) {
    return this.typeclientService.gettypeClient(id);
  }

  @Delete(':id')
  deleteTypeClient(@Param('id', ParseIntPipe) id: number) {
    return this.typeclientService.deleteTypeClient(id);
  }

  @Put(':id')
  updateTypeClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeClient: updateTypeClientDto,
  ) {
    return this.typeclientService.updateTypeClient(id, typeClient);
  }
}
