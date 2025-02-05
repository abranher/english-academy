import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreatePurchaseOrderDto {
  @IsArray()
  @Type(() => CreatePurchaseOrderItemDto)
  @ValidateNested({ each: true })
  courses: CreatePurchaseOrderItemDto[];

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber({}, { message: 'El monto debe ser un número válido.' })
  total: number;

  @IsString()
  @Matches(/^\d{6}$/, {
    message: 'El número de referencia debe tener exactamente 6 dígitos.',
  })
  payment_reference: string;
}

export class CreatePurchaseOrderItemDto {
  @IsString()
  courseId: string;
}
