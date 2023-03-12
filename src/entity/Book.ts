import { Entity, ObjectIdColumn, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    genre: string;

    @Column()
    publicationYear: number;
}
