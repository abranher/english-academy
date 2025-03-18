import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseEnrollmentOrderDto } from './create-course-enrollment-order.dto';

export class UpdateCourseEnrollmentOrderDto extends PartialType(CreateCourseEnrollmentOrderDto) {}
