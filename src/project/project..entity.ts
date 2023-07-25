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
  launchdate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  toolId: number;

  @Column()
  typeId: number;

  @Column()
  clientId: number;

  @Column()
  userId: number;

  @OneToMany(() => Tool, (tool) => tool.projects)
  tool: Tool;

  @ManyToOne(() => typeProject, (typeproyect) => typeproyect.proyects)
  type: typeProject;

  @ManyToOne(() => Client, (client) => client.proyects)
  client: Client;

  @ManyToOne(() => User, (user) => user.proyects)
  user: User;
}
