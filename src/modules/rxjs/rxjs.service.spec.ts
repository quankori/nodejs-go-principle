// observable.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RxjsService } from './rxjs.service';

jest.useFakeTimers();

describe('RxjsService', () => {
  let service: RxjsService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RxjsService],
    }).compile();

    service = module.get<RxjsService>(RxjsService);
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllTimers();
    consoleSpy.mockRestore();
  });

  describe('observable', () => {
    it('should emit values, handle completion, and unsubscribe correctly', () => {
      service.observable();

      // Immediate emission
      expect(consoleSpy).toHaveBeenCalledWith('Quan');

      // Fast-forward 2 seconds to emit 'Nguyen'
      jest.advanceTimersByTime(2000);
      expect(consoleSpy).toHaveBeenCalledWith('Nguyen');

      // Fast-forward 1 second to trigger unsubscribe at 3 seconds
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith('Unsubscribe');
      expect(consoleSpy).toHaveBeenCalledWith('Teardown');

      // Fast-forward to 5 seconds to check for 'Minh' and 'completed' (should not be called due to unsubscribe)
      jest.advanceTimersByTime(2000);
      expect(consoleSpy).not.toHaveBeenCalledWith('Minh');
      expect(consoleSpy).not.toHaveBeenCalledWith('completed');

      // Fast-forward to 10 seconds to check for 'err' (should not be called due to unsubscribe)
      jest.advanceTimersByTime(7000);
      expect(consoleSpy).not.toHaveBeenCalledWith('err');
    });
  });

  describe('cold', () => {
    it('should execute cold observable independently for each subscriber', () => {
      // Mock Math.random to return specific values
      const mathRandomSpy = jest.spyOn(Math, 'random');
      mathRandomSpy.mockReturnValueOnce(0.1).mockReturnValueOnce(0.2);

      service.cold();

      // Verify that the cold observable is executed twice
      expect(consoleSpy).toHaveBeenCalledWith(
        'Cold Observable: Executing for a new subscriber',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Cold Subscriber 1 received:',
        0.1,
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        'Cold Observable: Executing for a new subscriber',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Cold Subscriber 2 received:',
        0.2,
      );

      mathRandomSpy.mockRestore();
    });
  });

  describe('hot', () => {
    it('should emit the same values to all subscribers and handle delayed subscription', () => {
      // Mock Math.random to return specific values
      const mathRandomSpy = jest.spyOn(Math, 'random');
      mathRandomSpy
        .mockReturnValueOnce(0.3) // First emission
        .mockReturnValueOnce(0.4) // Second emission
        .mockReturnValueOnce(0.5) // Third emission
        .mockReturnValueOnce(0.6) // Fourth emission
        .mockReturnValueOnce(0.7); // Fifth emission

      service.hot();

      // Advance time to 1 second: First emission
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Observable: Emitting value 0.3',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 1 received:',
        0.3,
      );

      // Advance time to 2 seconds: Second emission
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Observable: Emitting value 0.4',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 1 received:',
        0.4,
      );

      // Advance time by 500ms to reach 2.5 seconds: Second subscriber subscribes
      jest.advanceTimersByTime(500);
      // No emission should occur at this exact time

      // Advance time by another 500ms to reach 3 seconds: Third emission
      jest.advanceTimersByTime(500);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Observable: Emitting value 0.5',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 1 received:',
        0.5,
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 2 received:',
        0.5,
      );

      // Advance time to 4 seconds: Fourth emission
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Observable: Emitting value 0.6',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 1 received:',
        0.6,
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 2 received:',
        0.6,
      );

      // Advance time to 5 seconds: Fifth emission
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Observable: Emitting value 0.7',
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 1 received:',
        0.7,
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'Hot Subscriber 2 received:',
        0.7,
      );

      mathRandomSpy.mockRestore();
    });
  });

  describe('filter', () => {
    it('should filter even numbers and map values correctly', () => {
      service.filter();

      // Verify that only even numbers are logged
      expect(consoleSpy).toHaveBeenCalledWith(2);
      expect(consoleSpy).toHaveBeenCalledWith(4);

      // Verify that mapped values are logged
      expect(consoleSpy).toHaveBeenCalledWith(10);
      expect(consoleSpy).toHaveBeenCalledWith(20);
      expect(consoleSpy).toHaveBeenCalledWith(30);
    });
  });
});
