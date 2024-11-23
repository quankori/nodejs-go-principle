import { Controller } from '@nestjs/common';
import { RxjsService } from './rxjs.service';

@Controller('rxjs')
export class RxjsController {
  constructor(private readonly rxjsService: RxjsService) {}
}
