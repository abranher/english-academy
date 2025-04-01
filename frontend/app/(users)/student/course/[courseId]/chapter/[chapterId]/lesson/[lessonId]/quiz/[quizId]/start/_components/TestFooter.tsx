import Link from "next/link";

import { cn } from "@/libs/shadcn/utils";
import { useQuizStore } from "@/services/store/student/quiz";
import { useQuizData } from "@/hooks/useQuizData";

import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { CardFooter } from "@/components/shadcn/ui/card";

export default function TestFooter() {
  const exercises = useQuizStore((state) => state.exercises);
  const currentExercise = useQuizStore((state) => state.currentExercise);
  const goNextQuestion = useQuizStore((state) => state.goNextQuestion);
  const goPreviusQuestion = useQuizStore((state) => state.goPreviusQuestion);
  const { unanswered } = useQuizData();

  return (
    <>
      <CardFooter className="py-8 w-full flex justify-between">
        <Button onClick={goPreviusQuestion} disabled={currentExercise === 0}>
          Volver
        </Button>
        {unanswered === 0 ? (
          <Link
            href="/students/initial-test/result"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Finalizar
          </Link>
        ) : (
          <Button
            onClick={goNextQuestion}
            disabled={currentExercise >= exercises.length - 1}
          >
            Siguiente
          </Button>
        )}
      </CardFooter>
    </>
  );
}
