export interface Chapter {
  id: string;
  title: string;
  description: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
}
