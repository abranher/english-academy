export interface Tutor {
  id: string;
  biography: string | null;
  approvedAt: Date | null;
  location: string | null;
  curriculumUrl: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
