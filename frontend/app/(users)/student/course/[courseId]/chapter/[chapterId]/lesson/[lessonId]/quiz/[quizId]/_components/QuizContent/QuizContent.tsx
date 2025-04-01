"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { cn } from "@/libs/shadcn/utils";
import { useQuery } from "@tanstack/react-query";
import { buttonVariants } from "@/components/shadcn/ui/button";
import { Quiz, QuizProgress } from "@/types/models";
import { getQuizWithProgress } from "@/services/network/enrollments/quiz";

import { CourseNav } from "@/components/enrollments";

import Preview from "@/components/shadcn/ui/preview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { FileQuestion } from "lucide-react";

export function QuizContent({ studentId }: { studentId: string }) {
  const { courseId, chapterId, lessonId, quizId } = useParams();

  const {
    isPending,
    data: lessonQuiz,
    isError,
  } = useQuery<Quiz & { quizProgress: QuizProgress | null }>({
    queryKey: ["enrollment_course_quiz_datails", quizId],
    queryFn: () => getQuizWithProgress(studentId, quizId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return (
    <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
      <section className="lg:col-span-5 gap-3 flex flex-col">
        <section className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <article className="flex justify-between items-center">
                <CardTitle>
                  <section className="flex gap-2 items-center">
                    <FileQuestion />
                    {`Quiz: ${lessonQuiz.title}`}
                  </section>
                </CardTitle>
              </article>
            </CardHeader>
          </Card>

          {lessonQuiz.description && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <Preview value={lessonQuiz.description} />
              </CardContent>
            </Card>
          )}

          <Card className="p-12">
            <CardHeader>
              <section className="text-center">
                <CardTitle>¿Listo para comenzar?</CardTitle>
              </section>
            </CardHeader>

            <CardContent>
              <article className="flex justify-center pt-5">
                <Link
                  className={cn(buttonVariants({ variant: "default" }))}
                  href={`/student/course/${courseId}/chapter/${chapterId}/lesson/${lessonId}/quiz/${quizId}/start`}
                >
                  Siguiente
                </Link>
              </article>
            </CardContent>
          </Card>
        </section>
      </section>

      <CourseNav studentId={studentId} />
    </section>
  );
}
