import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollmentOrderDto } from './create-enrollment-order.dto';

export class UpdateEnrollmentOrderDto extends PartialType(CreateEnrollmentOrderDto) {}
