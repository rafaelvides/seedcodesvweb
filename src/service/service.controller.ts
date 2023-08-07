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
import { serviceService } from './service.service'
import { createServiceDto } from './dto/create-service.dto'
import { Service } from './service.entity'
import { updateServiceDto } from './dto/update-service.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'

@Controller('ServiceC')
export class serviceController {
  constructor(private serviceService: serviceService) {}

  @Post()
  createService(@Body() newService: createServiceDto) {
    return this.serviceService.createService(newService)
  }

  @Get()
  getServices(): Promise<
    | { ok: boolean; services: Service[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.serviceService.getServices()
  }

  @Get(':id')
  @Auth(ValidRoles.admin)
  getService(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.getService(id)
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  deleteService(@Param('id', ParseIntPipe) id: number) {
    return this.serviceService.deleteService(id)
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() service: updateServiceDto
  ) {
    return this.serviceService.updateService(id, service)
  }
}
