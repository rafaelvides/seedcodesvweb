import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import {Proyect} from '../project/project..entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  registerdate: Date;

  @Column()
  roleId: number;

  @ManyToOne(() => Role, (role) => role.users)
  Role: Role

  @OneToMany(() => Proyect, proyect => proyect.user)
  proyects: Proyect[]
}
