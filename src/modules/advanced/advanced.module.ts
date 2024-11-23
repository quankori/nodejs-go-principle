import { Module } from '@nestjs/common';
import { AdvancedService } from './advanced.service';
import { AdvancedController } from './advanced.controller';

@Module({
  controllers: [AdvancedController],
  providers: [AdvancedService],
})
export class AdvancedModule {}
