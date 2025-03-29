import { EnrollmentOrderStatus, PaymentMethod } from "../enums";

export interface EnrollmentOrder {
  id: string;
  status: EnrollmentOrderStatus;
  enrollmentPrice: number;
  paymentMethod: PaymentMethod;
  paymentReference: number;
  approvedAt: Date | null;

  studentId: string;
  courseId: string;

  createdAt: Date;
  updatedAt: Date;
}
