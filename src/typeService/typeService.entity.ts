import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm'
import { Service } from '../service/service.entity'

@Entity()
export class typeService {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  payment: number

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Service, service => service.typeService)
  services: Service[]
}
