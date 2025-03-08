import { TutorStatus } from "../enums";
import { TutorStatusDecision } from "../enums/TutorStatusDecision";

export interface TutorStatusHistory {
  id: string;
  comment: string;
  previousStatus: TutorStatus;
  decision: TutorStatusDecision;
  resubmittedAt: Date | null;
  tutorId: string;
  createdAt: Date;
}
