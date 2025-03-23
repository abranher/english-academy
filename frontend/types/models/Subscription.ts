import { SubscriptionStatus } from "../enums";

export interface Subscription {
  id: string;
  startDate: Date | null;
  endDate: Date | null;
  status: SubscriptionStatus;

  planId: string;

  createdAt: Date;
  updatedAt: Date;
}
