import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class RxjsService {
  constructor() {}

  // Observable: A data producer that emits values over time to its subscribers.
  // Stream: A sequence of data elements made available asynchronously over time.
  // Hot Observable: An observable that emits values independently of subscriptions, sharing the same execution among all subscribers.
  // Cold Observable: An observable that starts emitting values anew for each subscriber, providing independent executions.
  // Marbles Diagram: https://rxmarbles.com/
  observable() {
    const observable$ = new Observable<string>((subscribe) => {
      subscribe.next('Quan');
      setTimeout(() => subscribe.next('Nguyen'), 2000);
      setTimeout(() => subscribe.next('Minh'), 4000);
      setTimeout(() => subscribe.complete(), 5000);
      setTimeout(() => subscribe.error(), 10000);
      return () => {
        console.log('Teardown');
      };
    });

    const subscription = observable$.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: () => console.log('err'),
    });
    setTimeout(() => {
      console.log('Unsubscribe');
      subscription.unsubscribe;
    }, 3000);

    // ** Cold Observable Example **
    // const coldObservable = this.cold();

    // coldObservable.subscribe((value) => {
    //   console.log('Cold Subscriber 1 received:', value);
    // });

    // coldObservable.subscribe((value) => {
    //   console.log('Cold Subscriber 2 received:', value);
    // });

    // ** Hot Observable Example **
    // const hotObservable = this.hot();

    // hotObservable.subscribe((value) => {
    //   console.log('Hot Subscriber 1 received:', value);
    // });

    // setTimeout(() => {
    //   hotObservable.subscribe((value) => {
    //     console.log('Hot Subscriber 2 received:', value);
    //   });
    // }, 2500);
  }

  /**
   * cold() - Demonstrates a Cold Observable.
   * Each subscriber gets its own independent execution.
   */
  cold() {
    return new Observable((observer) => {
      console.log('Cold Observable: Executing for a new subscriber');
      observer.next(Math.random());
      observer.complete();
    });
  }

  /**
   * hot() - Demonstrates a Hot Observable.
   * All subscribers share the same execution and receive the same data.
   */
  hot() {
    const subject = new Subject();

    // Simulate data emission
    setInterval(() => {
      const value = Math.random();
      console.log(`Hot Observable: Emitting value ${value}`);
      subject.next(value);
    }, 1000);

    return subject.asObservable();
  }
}
