import { Module } from "@nestjs/common";
import { ClassRoomController } from "./classroom.controller";
import { ClassRoomService } from "./classroom.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClassRoom } from "src/entities/classroom.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ClassRoom])],
    controllers: [ClassRoomController],
    providers: [ClassRoomService],    
})

export class ClassRoomModule {};