import {PrimaryGeneratedColumn, Entity, Column, ManyToOne, ManyToMany} from 'typeorm'
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

    @Column()
    typeId: number

    @ManyToOne(() => typeTool, typetool => typetool.tools)
    type: typeTool;

    @ManyToMany(() => Proyect, proyect => proyect.tool)
    projects: Proyect[]

}