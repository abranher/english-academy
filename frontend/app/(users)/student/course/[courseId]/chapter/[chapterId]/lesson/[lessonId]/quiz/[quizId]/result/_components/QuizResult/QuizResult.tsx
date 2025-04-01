"use client";

import { useParams, useRouter } from "next/navigation";

import axios from "@/config/axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQuizData } from "@/hooks/useQuizData";
import { useQuizStore } from "@/services/store/student/quiz";
import { Button } from "@/components/shadcn/ui/button";

import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Check, FileQuestion, Medal, PercentCircle } from "lucide-react";

export function QuizResult({ studentId }: { studentId: string }) {
  const { courseId, chapterId, lessonId, quizId } = useParams();
  const reset = useQuizStore((state) => state.reset);
  const { exercises, correct, progress, totalPoints } = useQuizData();

  const router = useRouter();

  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationFn: (quiz: { earnedPoints: number }) =>
      axios.put(
        `/api/quiz-progress/student/${studentId}/quiz/${quizId}/mark-as-done`,
        quiz
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Estudiante o Quiz no encontrado",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(message || errorMessages[status]);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  useEffect(() => {
    if (totalPoints !== undefined && !isSuccess && !isPending) {
      mutate({ earnedPoints: totalPoints });
    }
  }, [totalPoints, isSuccess, isPending, mutate]);

  return (
    <Card className="p-8">
      <section className="mx-auto flex flex-col gap-4">
        <section className="text-center flex flex-col gap-3">
          <section className="text-5xl">
            <CardTitle>¡Felicidades, en hora buena!</CardTitle>
          </section>

          <section className="flex justify-end">
            {isPending && <CardTitle>Guardando resultados...</CardTitle>}
            {isSuccess && (
              <CardTitle>🎉 Resultados guardados correctamente 🎉</CardTitle>
            )}
            {isError && <CardTitle>Error al guardar los resultados</CardTitle>}
          </section>
        </section>

        <article className="w-full my-6 flex flex-col gap-4">
          <CardDescription className="flex items-center gap-2 text-xl">
            <Medal aria-hidden="true" />
            Puntos Totales: {totalPoints}
          </CardDescription>

          <CardDescription className="flex items-center gap-2 text-xl">
            <FileQuestion aria-hidden="true" />
            Total de preguntas: {exercises.length}
          </CardDescription>

          <CardDescription className="flex items-center gap-2 text-xl">
            <Check aria-hidden="true" />
            Respuestas correctas: {correct}
          </CardDescription>

          <CardDescription className="flex items-center gap-2 text-xl">
            <PercentCircle aria-hidden="true" />
            Porcentaje de aciertos: {`${progress} %`}
          </CardDescription>
        </article>

        <section>
          <Button
            onClick={() => {
              reset();
              router.push(
                `/student/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}/quiz/${quizId}`
              );
            }}
          >
            Volver
          </Button>
        </section>
      </section>
    </Card>
  );
}
