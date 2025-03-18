import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreateCourseEnrollmentOrderDto {
  @IsArray()
  @Type(() => CreateCourseEnrollmentOrderItemDto)
  @ValidateNested({ each: true })
  courses: CreateCourseEnrollmentOrderItemDto[];

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber({}, { message: 'El monto debe ser un número válido.' })
  total: number;

  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'El número de referencia debe tener exactamente 6 dígitos.',
  })
  paymentReference: string;
}

export class CreateCourseEnrollmentOrderItemDto {
  @IsString()
  courseId: string;
}
