import { Entity, ObjectIdColumn, PrimaryColumn, Column, ObjectID } from 'typeorm';

@Entity()
export class Task {
    @ObjectIdColumn()
    _id: string;
    @PrimaryColumn()
    id: string;
    @Column()
    text: string;
    @Column()
    day: string;
    @Column()
    reminder: boolean;

}