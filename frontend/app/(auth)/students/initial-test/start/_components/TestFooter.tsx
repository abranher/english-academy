import { useInitialTestStore } from "@/services/store/initial-test";
import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { CardFooter } from "@/components/shadcn/ui/card";
import { useInitialTestData } from "@/components/hooks/useInitialTestData";
import Link from "next/link";
import { cn } from "@/libs/shadcn/utils";

export default function TestFooter() {
  const exercises = useInitialTestStore((state) => state.exercises);
  const currentExercise = useInitialTestStore((state) => state.currentExercise);
  const goNextQuestion = useInitialTestStore((state) => state.goNextQuestion);
  const goPreviusQuestion = useInitialTestStore(
    (state) => state.goPreviusQuestion
  );
  const { unanswered } = useInitialTestData();

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
