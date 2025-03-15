export interface QuizQuestionOption {
  id: string;
  option: string;
  isCorrect: boolean;

  quizQuestionId: string;

  createdAt: Date;
  updatedAt: Date;
}
