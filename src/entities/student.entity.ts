import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { EGender } from "./enum/egender";
import { ClassRoom } from "./classroom.entity";
import { StudentDetailDto } from "src/dto/student/StudentDetail.dto";

@Entity('students')
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: 'enum',
        enum: EGender,
        default: EGender.OTHER,
      })
    gender: EGender;
    
    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    dob: Date;

    // @Column()
    // @CreateDateColumn()
    // createAt: Date;

    // @Column()
    // @UpdateDateColumn()
    // updateAt: Date;

    // @Column()
    // @DeleteDateColumn()
    // deleteAt: Date;

    @ManyToOne(() => ClassRoom, (classroom) => classroom.students)
    classroom: ClassRoom;

}