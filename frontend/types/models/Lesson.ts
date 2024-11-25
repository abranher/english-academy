export interface Lesson {
  id: string;
  type: LessonType;
  position: number;
  status: LessonStatus;
  chapterId: string;
  createdAt: Date;
  updatedAt: Date;
}
