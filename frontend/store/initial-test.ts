import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "@/types/Question";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviusQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit: number) => {
        const res = await fetch("http://localhost:3000/data.json");
        const json = await res.json();

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

        set({ questions });
      },

      selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get();
        // usar el structuredClone para clonar el objeto
        const newQuestions = structuredClone(questions);
        // encontramos el indice de la pregunta
        const questionIndex = newQuestions.findIndex(
          (q) => q.id === questionId
        );
        // obtener la info de la pregunta
        const questionInfo = newQuestions[questionIndex];
        // averiguamos si el usuario a puesto la respuesta correcta
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
        // si la respuesta es correcta lanzamos confetti
        //if (isCorrectUserAnswer) confetti();
        // cambiar esta info en la copia de la pregunta
        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };

        // actualizamo el estado
        set({ questions: newQuestions });
      },
      goNextQuestion: () => {
        const { currentQuestion, questions } = get();

        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length)
          set({ currentQuestion: nextQuestion });
      },
      goPreviusQuestion: () => {
        const { currentQuestion } = get();

        const previusQuestion = currentQuestion - 1;

        if (previusQuestion >= 0) set({ currentQuestion: previusQuestion });
      },
      reset: () => {
        set({ currentQuestion: 0, questions: [] });
      },
    }),
    {
      name: "questions",
    }
  )
);
