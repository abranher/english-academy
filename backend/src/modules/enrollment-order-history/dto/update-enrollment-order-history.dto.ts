import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentOrderHistoryDto } from './create-enrollment-order-history.dto';

export class UpdateEnrollmentOrderHistoryDto extends PartialType(CreateEnrollmentOrderHistoryDto) {}
