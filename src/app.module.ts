import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClassRoomModule } from './modules/classrooms/classroom.module';
import { ClassRoom } from './entities/classroom.entity';
import { Student } from './entities/student.entity';
import { StudentModule } from './modules/students/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'huuhiep123',
      database: 'db_student',
      entities: [ClassRoom, Student],
      synchronize: true,
    }),
    ClassRoomModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
