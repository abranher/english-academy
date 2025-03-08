"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../_services/get-all-courses";
import { Course } from "@/types/models/Course";

import { MiniCourseCard } from "../MiniCourseCard";
import { CoursesListSkeleton } from "../CoursesListSkeleton";

import { Separator } from "@/components/shadcn/ui/separator";
import { FolderOpen } from "lucide-react";

export function AllCoursesList() {
  const {
    isPending,
    data: courses,
    isError,
  } = useQuery<Course[] | []>({
    queryKey: ["get_admin_courses_list"],
    queryFn: getAllCourses,
  });

  if (isPending) return <CoursesListSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los cursos</>;

  return (
    <>
      <section className="flex items-center justify-between">
        <article className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Listado de cursos
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás todos tu cursos.
          </p>
        </article>
      </section>

      <Separator className="my-4" />

      <section className="flex flex-col gap-3">
        {courses.length === 0 ? (
          <article className="text-lg w-full">
            <p className="flex justify-center flex-col items-center">
              <FolderOpen className="w-20 h-20" />
              Todavía no has creado cursos.
            </p>
          </article>
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
