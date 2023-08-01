import {PrimaryGeneratedColumn, Entity, Column, ManyToOne, OneToMany} from 'typeorm'
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
    typeToolId: number

    @ManyToOne(() => typeTool, typetool => typetool.tools)
    typeTool: typeTool;

    @OneToMany(() => Proyect, proyect => proyect.tool)
    projectjs: Proyect[]

}