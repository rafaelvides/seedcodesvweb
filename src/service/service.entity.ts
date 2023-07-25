import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from 'typeorm'
import { typeService} from '../typeService/typeService.entity'

@Entity()
export class Service{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    payment: number

    @Column()
    tool: string

    @Column({ default: true })
    isActive: boolean

    @Column()
    typeId: number

    @ManyToOne(() => typeService, typeservice => typeservice.services)
    type: typeService
}