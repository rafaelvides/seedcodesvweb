import { typeClient } from '../typeClient/typeClient.entity'
import {Column,Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {Proyect} from '../project/project..entity'

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firsname: string

    @Column()
    lastname: string

    @Column()
    telephone: string

    @Column()
    documentidentity: string

    @Column({type: 'datetime' , default:() => 'CURRENT_TIMESTAMP'})
    registrationdate: Date
    
    @Column()
    email: string

    @Column()
    tipeId: number

   @ManyToOne(() => typeClient, typeclient => typeclient.clients)
    tipe: typeClient

   @OneToMany(() => Proyect, proyect => proyect.client)
   proyects: Proyect[]
}