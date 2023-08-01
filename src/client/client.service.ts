import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/client/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { updateClientDto } from './dto/update-client.dto';
import {typeClient} from '../typeClient/typeClient.entity'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(typeClient) private typeClientRepository: Repository<typeClient>
  ) {}

  async createClient(client: CreateClientDto) {
    try {
      const clientByEmail = await this.getClientByEmailOrDocumentIdentity(
        client.email,
        client.documentIdentity,
      );

      if (clientByEmail) {
        if (clientByEmail.email === client.email) {
          return {
            ok: false,
            msg: `Email already exists ${client.email}`,
          };
        } else if (clientByEmail.documentIdentity === client.documentIdentity) {
          return {
            ok: false,
            msg: `DocumentIdentity already exists ${client.documentIdentity}`,
          };
        }
      }
      const verifyIdTypeClient = await this.typeClientRepository.findOne({
        where: {id: client.typeClientId}
      });
      if(!verifyIdTypeClient){
        return{
          ok: false,
          msg: `Invalid TypeClientId: ${client.typeClientId}`
        }
      }

      this.clientRepository.save(client);
      return {
        ok: true,
        msg: 'Client create',
        client,
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

  async getClients() {
    try {
      const clients = await this.clientRepository.find({
        where: {
          isActive: true,
        },
      });
      if (clients.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          clients,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active clients found',
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

  async getClient(id: number) {
    try {
      const clientFound = await this.clientRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!clientFound) {
        return {
          ok: false,
          mensaje: 'Client not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        clientFound,
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

  async getClientByEmailOrDocumentIdentity(
    email: string,
    documentIdentity: string,
  ) {
    const clientFound = await this.clientRepository.findOne({
      where: [
        { email, isActive: true },
        { documentIdentity: documentIdentity, isActive: true },
      ],
    });
    return clientFound;
  }

  async deleteClient(id: number) {
    try {
      const clientFound = await this.clientRepository.findOne({
        where: { id, isActive: true },
      });

      if (!clientFound) {
        return {
          ok: false,
          mensaje: 'Client does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }

      clientFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.clientRepository.save(clientFound);

      return {
        ok: true,
        msg: 'Client successfully delete',
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

  async updateClient(id: number, client: updateClientDto) {
    try {
      const clientFound = await this.clientRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });

      if (!clientFound) {
        return {
          ok: false,
          mensaje: 'Client not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateClient = Object.assign(clientFound, client);
      this.clientRepository.save(updateClient);
      return {
        ok: true,
        msg: 'Client was update',
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
