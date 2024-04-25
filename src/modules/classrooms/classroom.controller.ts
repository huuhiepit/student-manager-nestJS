import { Body, Controller, Delete, Get, Post, Put, Param, NotFoundException, Render } from "@nestjs/common";
import { ClassRoomService } from "./classroom.service";
import { ResponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ClassRoom } from "src/entities/classroom.entity";
import { ClassRoomDto } from "src/dto/classroom/ClassRoom.dto";

@Controller('classrooms')
export class ClassRoomController {

    constructor(private readonly classroomService: ClassRoomService) {}

    // @Get('/index')
    // @Render('classroom')
    // index() {
    //     return {message2: 'Hi! Bro, Welcome Classroom manager'}
    // }


    @Get()
    @Render('classroom')
    async index() {
        try {
            const classes = await this.classroomService.findAll();
            return {
                classrooms: classes
            };
        } catch (error) {
            // Xử lý lỗi ở đây nếu có
            console.error("Error:", error);
            return { classrooms: null };
        }
    }

    // async getClasses(): Promise<ResponseData<ClassRoom[]>> {
    //     try {
    //         const classes = await this.classroomService.findAll();
    //         return new ResponseData<ClassRoom[]>(classes, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    //     } catch (error) {
    //         return new ResponseData<ClassRoom[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    //     }
    // }

    @Get(':id')
    async getClass(@Param('id') id: number): Promise<ResponseData<ClassRoom>> {
        try {
            const classroom = await this.classroomService.findOne(id);
            if (!classroom) {
                throw new NotFoundException('Classroom not found.');
            }
            return new ResponseData<ClassRoom>(classroom, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ClassRoom>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get(':classroomId/students')
    async getStudentsInClassRoom(@Param('classroomId') classroomId: number) {
        return this.classroomService.findAllStudentsInClassRoom(classroomId);
    }

    @Post()
    async createClass(@Body() classroomNew: ClassRoomDto): Promise<ResponseData<ClassRoom>> {
        try {
            const newClassroom = await this.classroomService.create(classroomNew);
            return new ResponseData<ClassRoom>(newClassroom, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ClassRoom>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put(':id')
    async updateClass(@Param('id') id: number, @Body() classroomUpdate: ClassRoom): Promise<ResponseData<ClassRoom>> {
        try {
            const updatedClassroom = await this.classroomService.update(classroomUpdate, id);
            return new ResponseData<ClassRoom>(updatedClassroom, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<ClassRoom>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete(':id')
    async deleteClass(@Param('id') id: number): Promise<ResponseData<null>> {
        try {
            await this.classroomService.remove(id);
            return new ResponseData<null>(null, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ResponseData<null>(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
}
