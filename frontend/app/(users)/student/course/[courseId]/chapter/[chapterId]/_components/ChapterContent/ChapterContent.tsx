"use client";

import { useParams } from "next/navigation";

import { Chapter } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { getChapter } from "@/services/network/enrollments/chapter";

import { CourseNav } from "@/components/enrollments";

import Preview from "@/components/shadcn/ui/preview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { BookOpen } from "lucide-react";

export function ChapterContent({ studentId }: { studentId: string }) {
  const { chapterId } = useParams();

  const {
    isPending,
    data: chapter,
    isError,
  } = useQuery<Chapter>({
    queryKey: ["enrollment_course_chapter_datails", chapterId],
    queryFn: () => getChapter(studentId, chapterId as string),
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
                    <BookOpen />
                    {`Capítulo: ${chapter.title}`}
                  </section>
                </CardTitle>
              </article>
            </CardHeader>
          </Card>

          {chapter.description && (
            <Card>
              <CardHeader>
                <CardTitle>Descripción</CardTitle>
              </CardHeader>
              <CardContent>
                <Preview value={chapter.description} />
              </CardContent>
            </Card>
          )}

          {chapter.learningObjectives && (
            <Card>
              <CardHeader>
                <CardTitle>Objetivos de Aprendizaje</CardTitle>
                <Preview value={chapter.learningObjectives} />
              </CardHeader>
            </Card>
          )}
        </section>
      </section>

      <CourseNav studentId={studentId} />
    </section>
  );
}
