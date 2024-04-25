import { ClassRoom } from "src/entities/classroom.entity";
import { EGender } from "src/entities/enum/egender";

export class StudentDetailDto {
    id?: number;
    name?: string;
    gender?: EGender;
    phone?: string;
    address?: string;
    date?: Date;
    classRoom?: ClassRoom;
}