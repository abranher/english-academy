import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentOrderHistoryService } from './enrollment-order-history.service';

describe('EnrollmentOrderHistoryService', () => {
  let service: EnrollmentOrderHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnrollmentOrderHistoryService],
    }).compile();

    service = module.get<EnrollmentOrderHistoryService>(EnrollmentOrderHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
