import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentOrderHistoryController } from './enrollment-order-history.controller';
import { EnrollmentOrderHistoryService } from './enrollment-order-history.service';

describe('EnrollmentOrderHistoryController', () => {
  let controller: EnrollmentOrderHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentOrderHistoryController],
      providers: [EnrollmentOrderHistoryService],
    }).compile();

    controller = module.get<EnrollmentOrderHistoryController>(EnrollmentOrderHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
