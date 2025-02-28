import { TutorStatus } from "../enums";
import { Certification } from "./Certification";
import { TutorStatusHistory } from "./TutorStatusHistory";

export interface Tutor {
  id: string;
  userId: string;
  bio: string | null;
  cvUrl: string | null;
  status: TutorStatus;
  approvedAt: Date | null;
  tutorStatusHistory: TutorStatusHistory[] | [];
  certifications: Certification[] | [];
  createdAt: Date;
  updatedAt: Date;
}
