export interface Class {
  id: string;
  title: string;
  description: string | null;
  video: string | null;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
}
