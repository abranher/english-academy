import { QuizQuestion } from "./QuizQuestion";

export interface Quiz {
  id: string;
  title: string;
  description: string | null;

  lessonId: string;

  questions: QuizQuestion[] | [];

  createdAt: Date;
  updatedAt: Date;
}
