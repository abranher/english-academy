"use client";

import { useInitialTestData } from "@/components/hooks/useInitialTestData";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { cn } from "@/libs/shadcn/utils";
import { Check, FileQuestion, PercentCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ResultInitialTestPage() {
  const { data: session } = useSession();
  const { exercises, correct, progress } = useInitialTestData();

  return (
    <>
      <div className="container relative h-[600px] flex flex-col items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto max-w-lg flex flex-col gap-4">
            <div className="text-5xl">
              <h2>¡Felicidades, {session?.user.name}!</h2>
            </div>

            <div className="w-full my-6 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <FileQuestion />
                <h2 className="text-3xl">
                  Total de preguntas: {exercises.length}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <Check />
                <h2 className="text-3xl">Respuestas correctas: {correct}</h2>
              </div>

              <div className="flex items-center gap-2">
                <PercentCircle />
                <h2 className="text-3xl">
                  Porcentaje de aciertos: {`${progress} %`}
                </h2>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg">Análisis</h2>
              <p>
                Aunque has respondido algunas preguntas incorrectamente, ¡No te
                desanimes! Cada error es una oportunidad para aprender. Recuerda
                que la práctica hace al maestro.
              </p>
            </div>

            <div className="flex justify-end">
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/student/dashboard"
              >
                Siguiente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
