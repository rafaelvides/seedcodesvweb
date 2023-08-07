import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
<<<<<<< HEAD
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { createContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.entity';
import { updateContactDto } from './dto/update-contact.dto';
=======
} from '@nestjs/common'
import { ContactService } from './contact.service'
import { createContactDto } from './dto/create-contact.dto'
import { Contact } from './contact.entity'
import { updateContactDto } from './dto/update-contact.dto'
import { Auth } from 'src/auth/decorators'
import { ValidRoles } from 'src/auth/interfaces'
>>>>>>> 9807dfb11b3a48f0cfca087056b6c4997126b6d6

@Controller('Contact')
export class contactController {
  constructor(private contactService: ContactService) {}

  @Post()
  createContact(@Body() newContact: createContactDto) {
    return this.contactService.createContact(newContact)
  }

  @Get()
  async getContacts(): Promise<
    | { ok: boolean; contacts: Contact[]; msg?: string }
    | { ok: boolean; msg: string }
  > {
    return this.contactService.getContacts()
  }

  @Get(':id')
  getContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.getContact(id)
  }

  @Delete(':id')
  deleteContact(@Param('id', ParseIntPipe) id: number) {
    return this.contactService.deleteContact(id)
  }

  @Put(':id')
  updateContact(
    @Param('id', ParseIntPipe) id: number,
    @Body() contact: updateContactDto
  ) {
    return this.contactService.updateContact(id, contact)
  }
}
