import { DocumentType, PhoneCode } from '@prisma/client';
import { IsEnum, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateMobilePaymentDto {
  @IsEnum(PhoneCode, {
    message: 'Debe seleccionar un código de teléfono válido',
  })
  phoneCode: PhoneCode;

  @IsNumber()
  phoneNumber: number;

  @IsEnum(DocumentType, {
    message: 'Debe seleccionar un tipo de documento válido',
  })
  documentType: DocumentType;

  @IsNumber()
  documentNumber: number;

  @IsString()
  @MinLength(1, { message: 'Debe seleccionar un banco' })
  bankId: string;
}
