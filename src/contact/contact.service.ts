import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { createContactDto } from './dto/create-contact.dto';
import { updateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async createContact(contact: createContactDto) {
    try {
      const contactFound = await this.contactRepository.findOne({
        where: {
          typeContact: contact.typeContact,
        },
      });

      if (contactFound) {
        return {
          ok: false,
          msg: `typeContact already exists ${contact.typeContact}`,
        };
      }

      this.contactRepository.save(contact);
      return {
        ok: true,
        msg: 'Contact create',
        contact,
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getContacts() {
    try {
      const contacts = await this.contactRepository.find({
        where: {
          isActive: true,
        },
      });
      if (contacts.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          contacts,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active contacts found',
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getContact(id: number) {
    try {
      const contactFound = await this.contactRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!contactFound) {
        return {
          ok: false,
          mensaje: 'Contact not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        contactFound,
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteContact(id: number) {
    try {
      const contact = await this.contactRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!contact) {
        return {
          ok: false,
          mensaje: 'Contact does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      contact.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.contactRepository.save(contact);

      return {
        ok: true,
        msg: 'Contact successfully delete',
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateContact(id: number, contact: updateContactDto) {
    try {
      const contactFound = await this.contactRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!contactFound) {
        return {
          ok: false,
          mensaje: 'Contact not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateContact = Object.assign(contactFound, contact);
      this.contactRepository.save(updateContact);
      return {
        ok: true,
        msg: 'Contact was update',
      };
    } catch (error) {
      throw new HttpException(
        {
          ok: false,
          msg: `Error -> ${error.message}`,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
