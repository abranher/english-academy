import { BillingCycle } from "../enums";

export interface Plan {
  id: string;
  name: string;
  description: string | null;
  price: number;
  billingCycle: BillingCycle;
  isActive: boolean;
  maxCourses: number | null;

  createdAt: Date;
  updatedAt: Date;
}
