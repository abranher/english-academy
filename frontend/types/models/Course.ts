export interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  status: CourseStatus;
  levelId: string | null;
  skillId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
