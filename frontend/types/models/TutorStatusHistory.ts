import { TutorStatus } from "../enums";

export interface TutorStatusHistory {
  id: string;
  comment: string;
  previousStatus: TutorStatus;
  resubmittedAt: Date | null;
  tutorId: string;
  createdAt: Date;
}
