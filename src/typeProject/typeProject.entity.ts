import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm'
import { Proyect } from '../project/project.entity'

@Entity()
export class typeProject {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @Column({ default: true })
  isActive: boolean

  @OneToMany(() => Proyect, proyect => proyect.typeProject)
  proyects: Proyect[]
}
