import { EnrollmentOrderStatus, EnrollmentOrderStatusDecision } from "../enums";

export interface EnrollmentOrderHistory {
  id: string;
  comment: string;
  previousStatus: EnrollmentOrderStatus;
  decision: EnrollmentOrderStatusDecision;
  resubmittedAt: Date | null;

  enrollmentOrderId: string;

  createdAt: Date;
}
