export interface Chapter {
  id: string;
  title: string;
  description: string | null;
  position: number;

  courseId: string;

  createdAt: Date;
  updatedAt: Date;
}
