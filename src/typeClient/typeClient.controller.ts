import {
  Body,
  Controller,
  Get,
  Post,
  ParseIntPipe,
  Param,
  Delete,
  Put,
} from '@nestjs/common'
import { CreateTypeClientDto } from './dto/create-typeClient.dto'
import { typeClientService } from './typeClient.service'
import { typeClient } from './typeClient.entity'
import { updateTypeClientDto } from './dto/update-typeClient.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('typeClient')
export class typeClientController {
  constructor(private typeclientService: typeClientService) {}

  @Post()
  @Auth(ValidRoles.admin)
  createTypeClient(@Body() newtypeClient: CreateTypeClientDto) {
    return this.typeclientService.createTypeClient(newtypeClient)
  }

  @Get()
  @Auth(ValidRoles.admin)
  getTypeClients(): Promise<
    | { ok: boolean; typeClients: typeClient[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.typeclientService.gettypeClients()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getTypeClient(@Param('id', ParseIntPipe) id: number) {
    return this.typeclientService.gettypeClient(id)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteTypeClient(@Param('id', ParseIntPipe) id: number) {
    return this.typeclientService.deleteTypeClient(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateTypeClient(
    @Param('id', ParseIntPipe) id: number,
    @Body() typeClient: updateTypeClientDto
  ) {
    return this.typeclientService.updateTypeClient(id, typeClient)
  }
}
