import { typeClient } from '../typeClient/typeClient.entity'
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'
import { Proyect } from '../project/project.entity'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firsname: string

  @Column()
  lastname: string

  @Column()
  telephone: string

  @Column()
  documentIdentity: string

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  registrationDate: Date

  @Column()
  email: string

  @Column({ default: true })
  isActive: boolean

  @Column()
  typeClientId: number

  @ManyToOne(() => typeClient, typeclient => typeclient.clients)
  typeClient: typeClient

  @OneToMany(() => Proyect, proyect => proyect.client)
  proyects: Proyect[]
}
