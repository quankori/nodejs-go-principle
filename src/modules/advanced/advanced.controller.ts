import { Controller } from '@nestjs/common';
import { AdvancedService } from './advanced.service';

@Controller('advanced')
export class AdvancedController {
  constructor(private readonly advancedService: AdvancedService) {}
}
