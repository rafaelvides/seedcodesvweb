import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from 'typeorm'
import {typeTool} from '../typeTool/typeTool.entity'
import {Proyect} from '../project/project..entity'

@Entity()
export class Tool {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column({ default: true })
    isActive: boolean

    @Column()
    typeId: number

    @ManyToOne(() => typeTool, typetool => typetool.tools)
    type: typeTool;

    @ManyToOne(() => Proyect, proyect => proyect.tool)
    projects: Proyect[]

}