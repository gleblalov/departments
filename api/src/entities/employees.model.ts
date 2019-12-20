import { Entity, Column, ObjectIdColumn, } from 'typeorm';

@Entity()
export class Employees {
    @ObjectIdColumn()
    id: string;

    @Column()
    departmentID: string;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    email: string;

    @Column()
    experience: string;

    @Column()
    position: string;

    @Column()
    dateOfBirth: Date;

}