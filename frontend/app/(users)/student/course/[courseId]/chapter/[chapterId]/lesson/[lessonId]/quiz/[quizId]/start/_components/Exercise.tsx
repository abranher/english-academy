import { useQuizStore } from "@/services/store/student/quiz";

import TestFooter from "./TestFooter";

import { CardContent, CardTitle } from "@/components/shadcn/ui/card";
import { RadioGroup } from "@/components/shadcn/ui/radio-group";

const getBackgroundColor = (
  info: {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
    points: number;

    userSelectedAnswer?: number;
    isCorrectUserAnswer?: boolean;
  },
  index: number
) => {
  const { userSelectedAnswer, correctAnswer } = info;

  // usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return "bg-transparent";
  // si ya selecciono pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "bg-transparent";
  // si esta es la solucion correcta
  if (index === correctAnswer) return "border-emerald-400 bg-emerald-100";
  // si esta es la seleccion del usuario pero no es la correcta
  if (index === userSelectedAnswer) return "border-red-400 bg-red-100";

  // si no es ninguna de las anteriores
  return "bg-transparent";
};

export default function Exercise({
  info,
}: {
  info: {
    id: number;
    question: string;
    answers: string[];
    correctAnswer: number;
    points: number;

    userSelectedAnswer?: number;
    isCorrectUserAnswer?: boolean;
  };
}) {
  const selectAnswer = useQuizStore((state) => state.selectAnswer);

  const createHandleCLick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <section>
      <div className="p-6 flex flex-col gap-6">
        <CardTitle>{info.question}</CardTitle>
      </div>
      <div className="w-full">
        <CardContent className="flex flex-col justify-center items-center gap-6 py-4">
          <RadioGroup
            defaultValue="card"
            className="w-full grid md:grid-cols-2 gap-4"
          >
            {info.answers.map((answer, index) => (
              <div key={index} className="w-full">
                <button
                  disabled={info.userSelectedAnswer != null}
                  onClick={createHandleCLick(index)}
                  className={`w-full md:w-64 flex flex-col items-center text-large font-semibold justify-between rounded-md border-4 p-4 ${getBackgroundColor(
                    info,
                    index
                  )}`}
                >
                  {answer}
                </button>
              </div>
            ))}
          </RadioGroup>
        </CardContent>

        <TestFooter />
      </div>
    </section>
  );
}
