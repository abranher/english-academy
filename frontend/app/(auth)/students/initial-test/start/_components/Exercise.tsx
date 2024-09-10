import { Button } from "@/components/shadcn/ui/button";
import {
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { RadioGroup } from "@/components/shadcn/ui/radio-group";
import { useInitialTestStore } from "@/store/initial-test";
import { Question } from "@/types/Question";
import TestFooter from "./TestFooter";

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  // usuario no ha seleccionado nada todavia
  if (userSelectedAnswer == null) return "transparent";
  // si ya selecciono pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  // si esta es la solucion correcta
  if (index === correctAnswer) return "emerald";
  // si esta es la seleccion del usuario pero no es la correcta
  if (index === userSelectedAnswer) return "red";

  // si no es ninguna de las anteriores

  return "transparent";
};

export default function Exercise({ info }: { info: Question }) {
  const selectAnswer = useInitialTestStore((state) => state.selectAnswer);
  const reset = useInitialTestStore((state) => state.reset);

  const createHandleCLick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <>
      <div>
        <div className="p-6 flex flex-col gap-6">
          <CardTitle>{info.question}</CardTitle>
          <div className="text-lg">{info.text}</div>
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
                    className={`w-full md:w-64 flex flex-col items-center justify-between rounded-md border-4 p-4 border-${getBackgroundColor(
                      info,
                      index
                    )}-400`}
                  >
                    {answer}
                  </button>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <TestFooter />

          <CardFooter>
            <Button onClick={() => reset()} className="w-full">
              Reset
            </Button>
          </CardFooter>
        </div>
      </div>
    </>
  );
}
