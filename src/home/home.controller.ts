import {Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Put} from '@nestjs/common'
import { homeService } from './home.service';
import { createHomeDto } from './dto/create-home.dto';
import { Home } from './home.entity';
import { updateHomeDto } from './dto/update-home.dto';

@Controller('HomeC')
export class homeController{
    constructor(private homeService: homeService){}

    @Post()
    createHome(@Body() newHome: createHomeDto){
        return this.homeService.createHome(newHome)
    }

    @Get()
    getHomes(): Promise<Home[]> {
      return this.homeService.getHomes();
    }

    @Get(':id')
    getHome(@Param('id', ParseIntPipe)  id: number) {
      return this.homeService.getHome(id);
    }

    @Delete('id:')
    deleteHome(@Param('id', ParseIntPipe) id: number) {
      return this.homeService.deleteHome(id)
    }

    @Put(':id')
    updateHome(@Param('id', ParseIntPipe)id: number, @Body() home: updateHomeDto){
      return this.homeService.updateHome(id, home)
    }

}