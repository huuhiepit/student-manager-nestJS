import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { Student } from "src/entities/student.entity";
import { ClassRoomService } from "../classrooms/classroom.service";
import { ClassRoom } from "src/entities/classroom.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Student, ClassRoom])],
    controllers: [StudentController],
    providers: [StudentService, ClassRoomService],
})

export class StudentModule {};