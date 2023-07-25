import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {Client} from '../client/client.entity'

@Entity()
export class typeClient{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tipe: string

    @Column({default: true})
    isActive: boolean

    @OneToMany(() => Client, client => client.tipe)
    clients: Client[]
}