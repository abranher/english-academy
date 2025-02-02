import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "@/types/Question";

interface State {
  exercises: Question[];
  currentExercise: number;
  fetchExercises: (limit: number) => Promise<void>;
  selectAnswer: (exerciseId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviusQuestion: () => void;
  reset: () => void;
}

export const useInitialTestStore = create<State>()(
  persist(
    (set, get) => ({
      exercises: [],
      currentExercise: 0,

      fetchExercises: async (limit: number) => {
        const res = await fetch("http://localhost:8000/assets/data.json");
        const json = await res.json();

        const exercises = json.sort(() => Math.random() - 0.5).slice(0, limit);

        set({ exercises });
      },

      selectAnswer: (exerciseId: number, answerIndex: number) => {
        const { exercises } = get();
        // usar el structuredClone para clonar el objeto
        const newExercises = structuredClone(exercises);
        // encontramos el indice de la pregunta
        const questionIndex = newExercises.findIndex(
          (q) => q.id === exerciseId
        );
        // obtener la info de la pregunta
        const questionInfo = newExercises[questionIndex];
        // averiguamos si el usuario a puesto la respuesta correcta
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
        // si la respuesta es correcta lanzamos confetti
        //if (isCorrectUserAnswer) confetti();
        // cambiar esta info en la copia de la pregunta
        newExercises[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };

        // actualizamo el estado
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
      name: "questions",
    }
  )
);
