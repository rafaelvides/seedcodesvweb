import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm'
import {Tool} from '../tool/tool.entity'

@Entity()
export class typeTool {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string 
    
    @Column({default: true})
    isActive: boolean

    @OneToMany(() => Tool, tool => tool.typeTool)
    tools: Tool[]

}