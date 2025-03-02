import { AccountStatus, Roles } from "../enums";
import { Student } from "./Student";
import { Tutor } from "./Tutor";

export interface User {
  id: string;
  role: Roles;
  name: string;
  lastName: string;
  username: string | null;
  email: string;
  emailVerifiedAt: Date | null;
  password: string;
  birth: Date | null;
  avatarUrl: string | null;
  accountStatus: AccountStatus;
  profileComplete: boolean;
  countryId: string | null;
  student: Student | null;
  tutor: Tutor | null;
  createdAt: Date;
  updatedAt: Date;
}
