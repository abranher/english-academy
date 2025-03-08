"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../_services/get-all-courses";

import { Separator } from "@/components/shadcn/ui/separator";
import { Course } from "@/types/models/Course";
import { Card } from "@/components/shadcn/ui/card";

export function AllCoursesList({ userId }: { userId: string }) {
  const {
    isPending,
    data: courses,
    isError,
  } = useQuery<Course[] | []>({
    queryKey: ["get_tutor_courses_list"],
    queryFn: () => getAllCourses(userId),
  });

  console.log(courses);

  if (isPending) return <>Cargando...</>;
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

      <section>
        <Card></Card>
      </section>
    </>
  );
}
