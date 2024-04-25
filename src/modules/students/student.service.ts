import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentDto } from "src/dto/student/Student.dto";
import { EGender, mapGender } from "src/entities/enum/egender";
import { Student } from "src/entities/student.entity";
import { Repository } from "typeorm";
import { ClassRoomService } from "../classrooms/classroom.service";

@Injectable()
export class StudentService {
    
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        private readonly classroomService: ClassRoomService
    ) {}

    async findAll(): Promise<Student[]> {
        return await this.studentRepository.find({relations: ['classroom']});
    }

    async findOne(id: number): Promise<Student | null> {
        return await this.studentRepository.findOneBy({id});
    }

    async create(student: StudentDto): Promise<Student> {
        const studentNew = new Student();
        studentNew.name = student.name;
        studentNew.gender = mapGender(student.gender);
        studentNew.phone = student.phone;
        studentNew.address = student.address;
        studentNew.dob = new Date(student.dob);

        studentNew.classroom = await this.classroomService.findOne(student.classID);
        return await this.studentRepository.save(studentNew);
    }

    async update(studentUpdate: StudentDto, id: number): Promise<Student> {
        const studentEdit = await this.findOne(id);
    
        if (!studentEdit) {
            throw new NotFoundException('Student not found.');
        }
    
        // Hợp nhất thông tin mới từ studentUpdate vào studentEdit
        Object.assign(studentEdit, {
            name: studentUpdate.name,
            gender: mapGender(studentUpdate.gender),
            phone: studentUpdate.phone,
            address: studentUpdate.address,
            date: new Date(studentUpdate.dob),
        });
    
        if (studentUpdate.classID) {
            studentEdit.classroom.id = studentUpdate.classID; 
        }
        return await this.studentRepository.save(studentEdit);
    }

    async remove(id: number): Promise<void> {
        const result = await this.studentRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Student with ID ${id} not found.`);
        }
    }
    
}