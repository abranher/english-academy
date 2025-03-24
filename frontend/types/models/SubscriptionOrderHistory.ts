import {
  SubscriptionOrderStatus,
  SubscriptionOrderStatusDecision,
} from "../enums";

export interface SubscriptionOrderHistory {
  id: string;
  comment: string;
  previousStatus: SubscriptionOrderStatus;
  decision: SubscriptionOrderStatusDecision;
  resubmittedAt: Date | null;

  subscriptionOrderId: string;

  createdAt: Date;
}
