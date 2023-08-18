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
import { userService } from './user.service'
import { createUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { updateUserDto } from './dto/update-user.dto'
import { Auth } from '../auth/decorators'
import { ValidRoles } from '../auth/interfaces'

@Controller('User')
export class userController {
  constructor(private userService: userService) {}

  @Post()
  @Auth(ValidRoles.admin)
  createUser(@Body() newUser: createUserDto) {
    return this.userService.createUser(newUser)
  }

  @Get()
  @Auth(ValidRoles.admin)
  getUsers(): Promise<
    { ok: boolean; users: User[]; msg?: string } | { ok: boolean; msg: string }
  > {
    return this.userService.getUsers()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteClient(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: updateUserDto
  ) {
    return this.userService.updateUser(id, user)
  }
}
