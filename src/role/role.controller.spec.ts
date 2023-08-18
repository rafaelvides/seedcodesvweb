// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { roleController } from './role.controller';
import { RoleService } from './role.service';
import {createRoleDto} from './dto/create-role.dto'
import {updateRoleDto} from './dto/update-role.dto'
import { NotFoundException } from '@nestjs/common';
import { Any, Repository } from 'typeorm';
import { Role } from './role.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('RoleController', () => {
  let RoleController: roleController;
  let roleService: RoleService;
  let mockRoleRepository: any;
  

  beforeEach(async () => { 
    mockRoleRepository = {
      // Define aquí los métodos del Repository que necesitas para las pruebas
      // Por ejemplo:
      findOne: jest.fn(),
      createRole: jest.fn(),
      // ... y así sucesivamente
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [roleController],
      providers: [RoleService, {
        provide: getRepositoryToken(Role),
        useValue: mockRoleRepository,
      },]
    }).compile();

    RoleController = module.get<roleController>(roleController);
    roleService = module.get<RoleService>(RoleService);
  });

  describe('createRole', () => {
    it('should create a new roles', async () => {
      const createRoleDto: createRoleDto = { rol: 'New Role'};
      const createdRole = { ok: true, msg: 'Role create', Role:{ id: '1', rol: 'admin'}}
      jest.spyOn(roleService, 'createRole').mockResolvedValue(createdRole);

      const result = await RoleController.createRole(createRoleDto);
      expect(result).toEqual(createdRole);  
      });
  });
});
