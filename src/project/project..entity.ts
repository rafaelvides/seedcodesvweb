import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Tool } from '../tool/tool.entity';
import { typeProject } from '../typeProject/typeProject.entity';
import { Client } from '../client/client.entity';
import { User } from '../user/user.entity';

@Entity()
export class Proyect {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameProyect: string;

  @Column()
  description: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  launchDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  toolId: number;

  @Column()
  typeProjectId: number;

  @Column()
  clientId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Tool, tool => tool.projectjs)
  tool: Tool;

  @ManyToOne(() => typeProject, (typeproyect) => typeproyect.proyects)
  typeProject: typeProject;

  @ManyToOne(() => Client, (client) => client.proyects)
  client: Client;

  @ManyToOne(() => User, (user) => user.proyects)
  user: User;
}
