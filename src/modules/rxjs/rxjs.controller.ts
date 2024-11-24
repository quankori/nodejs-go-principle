import { Controller, Get } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Controller('rxjs')
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}

  @Get('')
  observable(): any {
    return this.rxjsService.observable();
  }
}
