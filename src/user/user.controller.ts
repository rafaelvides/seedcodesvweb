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
import { userService } from './user.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { updateUserDto } from './dto/update-user.dto';

@Controller('UserC')
export class userController {
  constructor(private userService: userService) {}

  @Post()
  createUser(@Body() newUser: createUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get()
  getUsers(): Promise<
    { ok: boolean; users: User[]; msg?: string } | { ok: boolean; msg: string }
  > {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Delete(':id')
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: updateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
