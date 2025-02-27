import { TutorStatus } from "../enums";

interface RejectionHistory {
  id: string;
  comment: string;
  previousStatus: TutorStatus;
  createdAt: Date;
}

export interface Tutor {
  id: string;
  userId: string;
  bio: string | null;
  cvUrl: string | null;
  status: TutorStatus;
  approvedAt: Date | null;
  rejectionHistory: RejectionHistory[] | null;
  createdAt: Date;
  updatedAt: Date;
}
