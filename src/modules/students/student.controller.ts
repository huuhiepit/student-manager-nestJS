import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { StudentService } from "./student.service";
import { ResponseData } from "src/global/globalClass";
import { Student } from "src/entities/student.entity";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { StudentDto } from "src/dto/student/Student.dto";

@Controller("students")
export class StudentController {

    constructor(
        private readonly studentService: StudentService
    ) {}

    @Get()
    async getStudents(): Promise<ResponseData<Student[]>> {
        try {
            return new ResponseData<Student[]>(await this.studentService.findAll(), HttpStatus.SUCCESS, HttpMessage.ERROR)
        } catch (error) {
            return new ResponseData<Student[]>(null, HttpStatus.SUCCESS, HttpMessage.ERROR)
            
        }
    }

    @Get(':id')
    async getStudent(@Param('id') id: number): Promise<ResponseData<Student>> {
        try {
            const student = await this.studentService.findOne(id);
            if(!student) {
                throw new NotFoundException('Student not found');
            }
            return new ResponseData<Student>(student, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<Student>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    async createStudent(@Body() studentNew: StudentDto): Promise<ResponseData<Student>> {
        try {
            return new ResponseData<Student>(
                await this.studentService.create(studentNew),
                HttpStatus.SUCCESS, HttpMessage.ERROR);
        } catch (error) {
            return new ResponseData<Student>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put(':id')
    async updateStudent(@Body() studentUpdate: StudentDto, @Param('id') id: number): Promise<ResponseData<Student>> {
        try {
            const student = await this.studentService.update(studentUpdate, id);
            return new ResponseData<Student>(
                student ,
                HttpStatus.SUCCESS, HttpMessage.SUCCESS
            )
        } catch (error) {
            return new ResponseData<Student>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id: number): Promise<ResponseData<null>> {
        try {
            await this.studentService.remove(id);
            return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<null>(null, HttpStatus.ERROR, error)
        }
    }
}