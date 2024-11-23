import { Test, TestingModule } from '@nestjs/testing';
import { AdvancedController } from './advanced.controller';
import { AdvancedService } from './advanced.service';

describe('AdvancedController', () => {
  let controller: AdvancedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvancedController],
      providers: [AdvancedService],
    }).compile();

    controller = module.get<AdvancedController>(AdvancedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
