export interface QuizProgress {
  id: string;
  isCompleted: boolean;
  earnedPoints: number | null;

  studentId: string;
  quizId: string;

  createdAt: Date;
  updatedAt: Date;
}
