import { PaymentMethod, SubscriptionOrderStatus } from "../enums";

export interface SubscriptionOrder {
  id: string;
  status: SubscriptionOrderStatus;
  subscriptionPrice: number;
  paymentMethod: PaymentMethod;
  paymentReference: number;

  tutorId: string;
  planId: string;
  subscriptionId: string;

  createdAt: Date;
  updatedAt: Date;
}
