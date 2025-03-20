import { DocumentType, PhoneCode } from "../enums";

export interface MobilePayment {
  id: string;
  phoneCode: PhoneCode;
  phoneNumber: number;
  documentType: DocumentType;
  documentNumber: number;
  bankId: string;

  createdAt: Date;
  updatedAt: Date;
}
