import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm'

@Entity()
export class Home {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  motto: string

  @Column()
  mission: string

  @Column()
  vision: string

  @Column()
  imag: string

  @Column({ default: true })
  isActive: boolean
}
