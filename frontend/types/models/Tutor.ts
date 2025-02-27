import { TutorStatus } from "../enums";
import { Certification } from "./Certification";

export interface StatusHistory {
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
  statusHistory: StatusHistory[] | null;
  certifications: Certification[] | null;
  createdAt: Date;
  updatedAt: Date;
}
