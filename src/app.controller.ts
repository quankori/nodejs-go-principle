import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RxjsService } from './modules/rxjs/rxjs.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
