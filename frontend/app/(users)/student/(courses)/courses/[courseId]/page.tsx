"use client";

import { Card, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Clock, Medal } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseIdPage() {
  const { courseId } = useParams();

  const {
    isPending,
    error,
    data: course,
  } = useQuery({
    queryKey: ["course-purchased-page"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/course-enrollments/course/${courseId}`
      );
      return response.data;
    },
  });

  return (
    <>
      <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3 px-24">
          <Card x-chunk="dashboard-01-chunk-0">
            <div className="flex flex-col gap-2 items-center py-4">
              <BookOpen className="h-9 w-9 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Capítulos finalizados
              </CardTitle>
              <div className="text-3xl font-bold">3</div>
            </div>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <div className="flex flex-col gap-2 items-center py-4">
              <Medal className="h-9 w-9 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Puntuación</CardTitle>
              <div className="text-3xl font-bold">+123</div>
            </div>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <div className="flex flex-col gap-2 items-center py-4">
              <Clock className="h-9 w-9 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Horas estudiadas
              </CardTitle>

              <div className="text-3xl font-bold">12,23</div>
            </div>
          </Card>
        </div>

        <Separator className="my-4" />

        <h2 className="text-2xl mt-5 font-bold tracking-tight flex gap-3 items-center">
          <BookOpen />
          Capítulos del curso
        </h2>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          {isPending ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className="p-3 md:basis-1/2 lg:basis-1/3 flex flex-col gap-3 mt-1"
                  key={index}
                >
                  <Skeleton className="w-full h-52" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))}
            </>
          ) : (
            <>
              {course &&
                course.chapters.map((chapter: any, index: any) => (
                  <Card key={chapter.id}>
                    <Link
                      href={`/student/courses/${courseId}/chapters/${chapter.id}`}
                    >
                      <div className="flex flex-col gap-2 items-center py-4">
                        <BookOpen className="h-9 w-9 text-muted-foreground" />
                        <CardTitle className="text-sm font-medium">
                          Capítulo {index + 1}
                        </CardTitle>
                        <div className="text-lg font-bold">{chapter.title}</div>
                      </div>
                    </Link>
                  </Card>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
