import { QuizQuestionOption } from "./QuizQuestionOption";

export interface QuizQuestion {
  id: string;
  question: string;
  points: number;

  quizId: string;

  options: QuizQuestionOption[] | [];

  createdAt: Date;
  updatedAt: Date;
}
