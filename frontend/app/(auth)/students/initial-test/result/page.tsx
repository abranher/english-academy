"use client";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { useInitialTestData } from "@/components/hooks/useInitialTestData";
import { cn } from "@/libs/shadcn/utils";

import { buttonVariants } from "@/components/shadcn/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Award, Check, FileQuestion, PercentCircle } from "lucide-react";

export default function ResultInitialTestPage() {
  const { data: session } = useSession();
  const { exercises, correct, progress, levelDescription } =
    useInitialTestData();

  return (
    <>
      <section className="container relative h-[600px] flex flex-col items-center justify-center">
        <Card className="lg:p-8">
          <div className="mx-auto max-w-lg flex flex-col gap-4">
            <div className="text-5xl">
              <CardTitle>¡Felicidades, {session?.user.name}!</CardTitle>
            </div>

            <article className="w-full my-6 flex flex-col gap-4">
              <CardDescription className="flex items-center gap-2 text-xl">
                <FileQuestion />
                <h2>Total de preguntas: {exercises.length}</h2>
              </CardDescription>

              <CardDescription className="flex items-center gap-2 text-xl">
                <Check />
                <h2>Respuestas correctas: {correct}</h2>
              </CardDescription>

              <CardDescription className="flex items-center gap-2 text-xl">
                <PercentCircle />
                <h2>Porcentaje de aciertos: {`${progress} %`}</h2>
              </CardDescription>

              <CardDescription className="flex items-center gap-2 text-xl">
                <Award />
                <h2>{levelDescription}</h2>
              </CardDescription>
            </article>

            <article>
              <h2 className="font-semibold text-lg">Análisis</h2>
              <p>
                Aunque has respondido algunas preguntas incorrectamente, ¡No te
                desanimes! Cada error es una oportunidad para aprender. Recuerda
                que la práctica hace al maestro.
              </p>
            </article>

            <div className="flex justify-end">
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/student/dashboard"
              >
                Siguiente
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
