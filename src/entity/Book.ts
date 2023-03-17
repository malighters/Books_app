import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Author } from './Author.js';


@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    genre: string;

    @Column()
    publicationYear: number;

    @ManyToOne('Author', 'books')
    author: Author;
}
