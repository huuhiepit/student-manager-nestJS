import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./student.entity";

@Entity("classrooms")
export class ClassRoom extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Student, (student) => student.classroom)
    students: Student[]
}