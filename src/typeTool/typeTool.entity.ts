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

    @Column({type: 'datetime' , default:() => 'CURRENT_TIMESTAMP'})
    launchdate: Date

    @OneToMany(() => Tool, tool => tool.type)
    tools: Tool[]

    

}