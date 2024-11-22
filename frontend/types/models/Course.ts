export interface Course {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  imageUrl: string | null;
  status: CourseStatus;
  isPublished: boolean;
  levelId: string | null;
  categoryId: string | null;
  subcategoryId: string | null;
  skillId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
