import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm'
import { Home } from '../home/home.entity'

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({ default: true })
  isActive: boolean
}
