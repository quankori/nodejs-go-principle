import { Module } from '@nestjs/common';
import { RxjsService } from './rxjs.service';
import { RxjsController } from './rxjs.controller';

@Module({
  controllers: [RxjsController],
  providers: [RxjsService],
  exports: [RxjsService],
})
export class RxjsModule {}
