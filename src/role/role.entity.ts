import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm'
import {User} from '../user/user.entity'

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rol: string

    @Column({ default: true })
    isActive: boolean
    
    @OneToMany(() => User, user => user.Role)
    users: User[]
}