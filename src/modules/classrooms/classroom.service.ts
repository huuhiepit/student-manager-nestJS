import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClassRoomDto } from "src/dto/classroom/ClassRoom.dto";
import { ClassRoom } from "src/entities/classroom.entity";

import { Repository } from "typeorm";

@Injectable()
export class ClassRoomService {
    
    constructor(
        @InjectRepository(ClassRoom)
        private classroomsRepository: Repository<ClassRoom>,
    ) {}
    
    async findAllStudentsInClassRoom(classroomId: number) {
        return await this.classroomsRepository
        .createQueryBuilder('classroom')
        .leftJoinAndSelect('classroom.students', 'student')
        .where('classroom.id = :classroomId', {classroomId})
        .getMany();
    }

    async findAll(): Promise<ClassRoom[]> {
        return await this.classroomsRepository.find({relations: ['students']});
    }
    
    async findOne(id: number): Promise<ClassRoom | null> {
        return await this.classroomsRepository.findOneBy({id});
    }

    async create(classroomNew: ClassRoomDto): Promise<ClassRoom> {
        return await this.classroomsRepository.save(classroomNew);
    }

    async update(classroomUpdate: ClassRoomDto, id: number): Promise<ClassRoom> {
        const classroomEdit = await this.findOne(id);
        if (!classroomEdit) {
            throw new NotFoundException('Classroom not found.');
        }
        return await this.classroomsRepository.save({...classroomEdit, ...classroomUpdate});
    }

    async remove(id: number): Promise<void> {
        const result = await this.classroomsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Classroom with ID ${id} not found.`);
        }
    }
}
