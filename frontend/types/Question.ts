export interface Question {
  id: number;
  level: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  points: number;

  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
