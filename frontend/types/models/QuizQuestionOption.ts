export interface QuizQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;

  quizQuestionId: string;

  createdAt: Date;
  updatedAt: Date;
}
