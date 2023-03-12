import { Entity, ObjectIdColumn, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
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
