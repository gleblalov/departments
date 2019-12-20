import { Entity, Column, ObjectIdColumn, } from 'typeorm';

@Entity()
export class Departments {
    @ObjectIdColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    describe: string;

}