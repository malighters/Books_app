import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './User.js';
import { Book } from './Book.js';

@Entity()
export class Author extends User{
    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}