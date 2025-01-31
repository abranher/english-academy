export interface Student {
  id: string;
  bio: string | null;
  initialTestAt: Date | null;
  userId: string;
  levelId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
