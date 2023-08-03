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
import { homeService } from './home.service';
import { createHomeDto } from './dto/create-home.dto';
import { Home } from './home.entity';
import { updateHomeDto } from './dto/update-home.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('Home')
export class homeController {
  constructor(private homeService: homeService) {}

  @Post()
  createHome(@Body() newHome: createHomeDto) {
    return this.homeService.createHome(newHome);
  }

  @Get()
  async getContacts(): Promise<
    { ok: boolean; homes: Home[]; msg?: string } | { ok: boolean; msg: string }
  > {
    return this.homeService.getHomes();
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getHome(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.getHome(id);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteHome(@Param('id', ParseIntPipe) id: number) {
    return this.homeService.deleteHome(id);
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateHome(
    @Param('id', ParseIntPipe) id: number,
    @Body() home: updateHomeDto,
  ) {
    return this.homeService.updateHome(id, home);
  }
}
