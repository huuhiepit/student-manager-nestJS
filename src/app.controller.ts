import { Get, Controller, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello Hiep DEV, welcome to NestJS!' };
  }
  @Get('/about')
  @Render('about')
  about() {
    return { message1: 'Hi! Hiep Dev, Welcome to NestJS'};
  }
}