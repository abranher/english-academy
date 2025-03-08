import { TutorStatus } from "../enums";
import { Certification } from "./Certification";
import { TutorStatusHistory } from "./TutorStatusHistory";
import { User } from "./User";

export interface Tutor {
  id: string;
  bio: string | null;
  cvUrl: string | null;
  status: TutorStatus;
  approvedAt: Date | null;

  user: User | null;

  userId: string;

  tutorStatusHistory: TutorStatusHistory[] | [];
  certifications: Certification[] | [];

  createdAt: Date;
  updatedAt: Date;
}
