import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface QuizQuestion {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: number;
  points: number;

  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}

interface State {
  exercises: QuizQuestion[];
  currentExercise: number;
  selectAnswer: (exerciseId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviusQuestion: () => void;
  reset: () => void;
}

export const useQuizStore = create<State>()(
  persist(
    (set, get) => ({
      exercises: [],
      currentExercise: 0,

      selectAnswer: (exerciseId: number, answerIndex: number) => {
        const { exercises } = get();
        const newExercises = structuredClone(exercises);
        const questionIndex = newExercises.findIndex(
          (q) => q.id === exerciseId
        );

        if (questionIndex === -1) return;

        const questionInfo = newExercises[questionIndex];
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

        newExercises[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };

        set({ exercises: newExercises });
      },

      goNextQuestion: () => {
        const { currentExercise, exercises } = get();
        const nextQuestion = currentExercise + 1;
        if (nextQuestion < exercises.length)
          set({ currentExercise: nextQuestion });
      },

      goPreviusQuestion: () => {
        const { currentExercise } = get();
        const previusQuestion = currentExercise - 1;
        if (previusQuestion >= 0) set({ currentExercise: previusQuestion });
      },
      reset: () => {
        set({ currentExercise: 0, exercises: [] });
      },
    }),
    {
      name: "student_quiz",
    }
  )
);
