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
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('Client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Post()
  @Auth(ValidRoles.admin)
  createClient(@Body() newClient: CreateClientDto) {
    return this.clientService.createClient(newClient);
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.getClient(id);
  }

  @Get()
  @Auth(ValidRoles.admin)
  async getClients(): Promise<
    | { ok: boolean; clients: Client[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.clientService.getClients();
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.deleteClient(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() client: updateClientDto,
  ) {
    return this.clientService.updateClient(id, client);
  }
}
