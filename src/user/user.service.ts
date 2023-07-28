import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: createUserDto) {
    try {
      const userFound = await this.getUserByEmail(user.email);

      if (userFound) {
        if (userFound.email === user.email) {
          return {
            ok: false,
            msg: `Email already exists ${user.email}`,
          };
        }
      }

      const hashedPassword = await hash(user.password, 10); // Encripta la contraseña

      const newUser = this.userRepository.create({
        lastname: user.lastname,
        email: user.email,
        password: hashedPassword,
        roleId: user.roleId,
      });
      this.userRepository.save(newUser)
      return {
        ok: true,
        msg: 'User create',
        newUser,
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

  async getUsers() {
    try {
      const users = await this.userRepository.find({
        where: { isActive: true },
      });
      if (users.length > 0) {
        // Si hay clientes activos, devolver la respuesta con los clientes encontrados
        return {
          ok: true,
          users,
        };
      } else {
        // Si no hay clientes activos, devolver la respuesta indicando que no se encontraron clientes
        return {
          ok: false,
          msg: 'No active user found',
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

  async getUser(id: number) {
    try {
      const userFound = await this.userRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!userFound) {
        return {
          ok: false,
          mensaje: 'User not found',
          status: HttpStatus.NOT_FOUND,
        };
      }
      return {
        ok: true,
        userFound,
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

  async getUserByEmail(email: string) {
    const userFound = await this.userRepository.findOne({
      where: [{ email, isActive: true }],
    });

    return userFound;
  }

  async findByUsername(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async deleteUser(id: number) {
    try {
      const userFound = await this.userRepository.findOne({
        where: { id, isActive: true },
      });
      if (!userFound) {
        return {
          ok: false,
          mensaje: 'User does not exist in the database',
          status: HttpStatus.NOT_FOUND,
        };
      }
      userFound.isActive = false; // Cambiar el estado a 0 (inactivo)
      await this.userRepository.save(userFound);

      return {
        ok: true,
        msg: 'User successfully delete',
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

  async updateUser(id: number, user: updateUserDto) {
    try {
      const userFound = await this.userRepository.findOne({
        where: {
          id,
          isActive: true,
        },
      });
      if (!userFound) {
        return {
          ok: false,
          mensaje: 'User not found',
          status: HttpStatus.NOT_FOUND,
        };
      }

      const updateUser = Object.assign(userFound, user);
      this.userRepository.save(updateUser);
      return {
        ok: true,
        msg: 'User was update',
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
