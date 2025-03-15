export interface Quiz {
  id: string;
  title: string;
  description: string | null;

  lessonId: string;

  createdAt: Date;
  updatedAt: Date;
}
