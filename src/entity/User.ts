import {Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm"; 

@Entity()
export class User extends BaseEntity {
    @ObjectIdColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    passwordHash: string;
}