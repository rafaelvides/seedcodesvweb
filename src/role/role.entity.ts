import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm'
import {User} from '../user/user.entity'

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    rol: string
    
    @OneToMany(() => User, user => user.Role)
     users: User[]
}