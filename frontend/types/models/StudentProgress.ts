export interface StudentProgress {
  id: string;
  studentId: string;
  chapterId: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
