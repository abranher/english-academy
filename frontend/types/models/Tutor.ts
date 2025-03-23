import { TutorStatus } from "../enums";
import { Certification } from "./Certification";
import { MobilePayment } from "./MobilePayment";
import { Subscription } from "./Subscription";
import { TutorStatusHistory } from "./TutorStatusHistory";
import { User } from "./User";

export interface Tutor {
  id: string;
  bio: string | null;
  cvUrl: string | null;
  status: TutorStatus;
  approvedAt: Date | null;

  userId: string;
  mobilePaymentId: string | null;
  activeSubscriptionId: string | null;

  user: User | null;
  mobilePayment: MobilePayment | null;
  activeSubscription: Subscription | null;

  tutorStatusHistory: TutorStatusHistory[] | [];
  certifications: Certification[] | [];

  createdAt: Date;
  updatedAt: Date;
}
