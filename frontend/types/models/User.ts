export interface User {
  id: string;
  role: Roles;
  name: string;
  secondName: string | null;
  lastName: string;
  secondLastName: string | null;
  username: string;
  email: string;
  emailVerifiedAt: Date | null;
  password: String;
  birthdate: Date | null;
  avatarUrl: String | null;
  accountStatus: AccountStatus;
  lastConnection: Date | null;
  secretToken: string | null;
  profileComplete: boolean;
  countryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
