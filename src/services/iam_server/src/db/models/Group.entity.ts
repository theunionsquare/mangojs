import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    BeforeInsert,
} from 'typeorm'
import { Types, utils } from '@mangojs/core'

@Entity({name: 'groups', schema: 'iam'})
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: Types.entities.AuthUserType,
    })
    userType: Types.entities.AuthUserType

    @Column({ type: 'uuid', unique: true })
    uid: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({ type: 'text' })
    permissions: string

    @ManyToMany('AdminUser', 'groups')
    adminUsers: any[]

    @BeforeInsert()
    generateUid() {
        this.uid = utils.generateUUID()
    }
}

export interface IGroup {
    id?: number
    userType: Types.entities.AuthUserType
    uid: string
    name: string
    description: string
    permissions: string
    adminUsers?: any[]
}