import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm'
import {Service} from '../service/service.entity'

@Entity()
export class typeService{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    payment: number

    @OneToMany(() => Service, service => service.type)
    services: Service[]
}