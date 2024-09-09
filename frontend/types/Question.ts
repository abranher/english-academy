export interface Question {
  id: number;
  question: string;
  text: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
