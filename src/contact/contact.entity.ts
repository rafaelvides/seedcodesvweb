import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm'
import {Home} from '../home/home.entity'

@Entity()
export class Contact{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    typeContact: string

    @Column()
    description: string

    @OneToMany(() => Home, home => home.contact)
    homes: Home[]

}