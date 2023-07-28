import {
  Controller,
  Body,
  Post,
  Param,
  ParseIntPipe,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';
import { updateClientDto } from './dto/update-client.dto';
import {Roles} from '../auth/roles.decorator'

@Roles('admin')
@Controller('clients')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @Roles('admin')
  createClient(@Body() newClient: CreateClientDto) {
    return this.clientService.createClient(newClient);
  }

  @Get(':id')
  getClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClient(id);
  }

  @Get()
  async getClients(): Promise<
    | { ok: boolean; clients: Client[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.clientService.getClients();
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.deleteClient(id);
  }

  @Put(':id')
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: updateClientDto,
  ) {
    return this.clientService.updateClient(id, client);
  }
}
