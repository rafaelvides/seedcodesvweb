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
    typeServiceId: number

    @ManyToOne(() => typeService, typeservice => typeservice.services)
    typeService: typeService
}