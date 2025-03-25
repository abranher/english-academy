"use client";

import { useParams } from "next/navigation";

import { Class, ClassProgress } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { getClassWithProgress } from "@/services/network/enrollments/class";

export function ClassContent({ studentId }: { studentId: string }) {
  const { classId } = useParams();

  const {
    isPending,
    data: lessonClass,
    isError,
  } = useQuery<Class & { classProgress: ClassProgress }>({
    queryKey: ["enrollment_course_class_datails", classId],
    queryFn: () => getClassWithProgress(studentId, classId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return <div>ClassContent</div>;
}
