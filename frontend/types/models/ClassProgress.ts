export interface ClassProgress {
  id: string;
  isCompleted: boolean;

  studentId: string;
  classId: string;

  createdAt: Date;
  updatedAt: Date;
}
