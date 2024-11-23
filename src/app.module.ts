import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvancedModule } from './modules/advanced/advanced.module';
import { RxjsModule } from './modules/rxjs/rxjs.module';

@Module({
  imports: [AdvancedModule, RxjsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
