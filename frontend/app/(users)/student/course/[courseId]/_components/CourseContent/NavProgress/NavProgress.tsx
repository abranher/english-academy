"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getCourseProgressNav } from "@/services/network/enrollments";

import { CourseProgressNav } from "@/components/student/CourseProgressNav";

export function NavProgress({ studentId }: { studentId: string }) {
  const { courseId } = useParams();

  const {
    isPending,
    data: navItems,
    isError,
  } = useQuery({
    queryKey: ["course_Progress_Nav", courseId],
    queryFn: () => getCourseProgressNav(studentId, courseId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <section className="lg:col-span-3">
      <CourseProgressNav courseId={courseId as string} items={navItems} />
    </section>
  );
}
