"use client";

import { useQuery } from "@tanstack/react-query";
import { Course } from "@/types/models/Course";
import { CourseReviewStatus } from "@/types/enums";
import { getByReviewStatus } from "../../_services/get-by-review-status";

import { CoursesListSkeleton } from "../CoursesListSkeleton";
import { MiniCourseCard } from "../MiniCourseCard";

import { Separator } from "@/components/shadcn/ui/separator";
import { FolderOpen } from "lucide-react";

export function RejectedCoursesList() {
  const {
    isPending,
    data: courses,
    isError,
  } = useQuery<Course[] | []>({
    queryKey: ["get_admin_courses_list", CourseReviewStatus.REJECTED],
    queryFn: () => getByReviewStatus(CourseReviewStatus.REJECTED),
  });

  if (isPending) return <CoursesListSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los cursos</>;

  return (
    <>
      <section className="flex items-center justify-between">
        <article className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Listado de cursos Rechazados
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás tu cursos que han sido Rechazados.
          </p>
        </article>
      </section>

      <Separator className="my-4" />

      <section className="flex flex-col gap-3">
        {courses.length === 0 ? (
          <div className="text-lg w-full">
            <p className="flex justify-center flex-col items-center">
              <FolderOpen className="w-20 h-20" />
              No tienes cursos Rechazados.
            </p>
          </div>
        ) : (
          <>
            {courses.map((course: Course) => (
              <MiniCourseCard key={course.id} course={course} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
