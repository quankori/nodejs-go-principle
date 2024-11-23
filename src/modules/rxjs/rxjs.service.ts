import { Injectable, OnModuleInit } from '@nestjs/common';
import { subscribe } from 'diagnostics_channel';
import { Observable } from 'rxjs';

@Injectable()
export class RxjsService implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    this.init();
  }

  init() {
    const result = new Observable<string>((subscribe) => {
      subscribe.next('Quan');
      subscribe.next('Kori');
    });
    console.log(result.subscribe())
  }
}
