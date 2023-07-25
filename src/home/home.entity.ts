import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from 'typeorm'
import {Contact} from '../contact/contact.entity'

@Entity()
export class Home{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    motto: string

    @Column()
    mission: string

    @Column()
    vision: string

    @Column()
    values: string

    @Column()
    imag: string

    @Column()
    service: string

    @Column()
    contactId: number

    @Column({default: true})
    isActive: boolean

    @ManyToOne(() => Contact, contact => contact.homes)
    contact: Contact
}