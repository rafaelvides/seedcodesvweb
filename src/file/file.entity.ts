import { Folder } from 'src/folder/folder.entity'
import {PrimaryGeneratedColumn, Entity, Column, ManyToOne} from 'typeorm'

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    file: string

    @Column()
    folderId: number

    @ManyToOne(() => Folder, folder => folder.files)
    folder: Folder

}