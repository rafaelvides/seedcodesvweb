import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Interested {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  cellphone: string

  @Column('text')
  description: string

  @Column({ default: true })
  isActive: boolean
}
