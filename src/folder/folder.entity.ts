import {PrimaryGeneratedColumn, Entity, Column, OneToMany} from 'typeorm'
import {File} from '../file/file.entity'

@Entity()
export class Folder{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    path: string

    @Column()
    name: string

    @OneToMany(() =>File, file => file.folder)
    files: File[]

}