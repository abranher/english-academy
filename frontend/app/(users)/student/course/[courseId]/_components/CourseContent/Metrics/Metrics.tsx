"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getEnrollmentMetrics } from "@/services/network/enrollments";

import { Card, CardDescription, CardHeader } from "@/components/shadcn/ui/card";
import { ClipboardList, FileVideo, Medal } from "lucide-react";

export function Metrics({ studentId }: { studentId: string }) {
  const { courseId } = useParams();

  const {
    isPending,
    data: metrics,
    isError,
  } = useQuery<{
    completedClasses: number;
    completedQuizzes: number;
    totalPoints: number;
  }>({
    queryKey: ["metrics_enrollment_course_datails", courseId],
    queryFn: () => getEnrollmentMetrics(studentId, courseId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <article className="flex gap-3 items-center">
      <Card className="w-full">
        <CardHeader>
          <section className="flex flex-col items-center gap-2">
            <CardDescription className="font-bold text-lg text-center">
              Clases completadas
            </CardDescription>
            <CardDescription className="flex items-center gap-3 font-bold text-4xl">
              <FileVideo className="w-12 h-12" />
              {metrics.completedClasses}
            </CardDescription>
          </section>
        </CardHeader>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <section className="flex flex-col items-center gap-2">
            <CardDescription className="font-bold text-lg text-center">
              Puntos
            </CardDescription>
            <CardDescription className="flex items-center gap-3 font-bold text-4xl">
              <Medal className="w-12 h-12" />
              {metrics.totalPoints}
            </CardDescription>
          </section>
        </CardHeader>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <section className="flex flex-col items-center gap-2 ">
            <CardDescription className="font-bold text-lg text-center">
              Quizzes completados
            </CardDescription>
            <CardDescription className="flex items-center gap-3 font-bold text-4xl">
              <ClipboardList className="w-12 h-12" />
              {metrics.completedQuizzes}
            </CardDescription>
          </section>
        </CardHeader>
      </Card>
    </article>
  );
}
