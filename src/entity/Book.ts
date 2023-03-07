import { Entity, ObjectIdColumn, Column, BaseEntity} from "typeorm"; 

@Entity()
export class Book extends BaseEntity {
    @ObjectIdColumn()
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
