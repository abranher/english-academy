"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import {
  Category,
  Course,
  Enrollment,
  Level,
  SubCategory,
} from "@/types/models";
import { Image } from "@heroui/react";
import { assetImg } from "@/libs/asset";
import { truncateString } from "@/libs/format";
import { getEnrollment } from "@/services/network/enrollments";

import { NavProgress } from "./NavProgress";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ClipboardList, FileVideo, ImageIcon, Medal } from "lucide-react";

export function CourseContent({ studentId }: { studentId: string }) {
  const { courseId } = useParams();

  const {
    isPending,
    data: enrollment,
    isError,
  } = useQuery<
    Enrollment & {
      course: Course & {
        category: Category;
        subcategory: SubCategory;
        level: Level;
      };
    }
  >({
    queryKey: ["enrollment_course_datails", courseId],
    queryFn: () => getEnrollment(studentId, courseId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return (
    <>
      <Card className="flex flex-wrap items-start gap-5 p-3 relative">
        {enrollment.course.image ? (
          <article className="aspect-video rounded-lg w-40">
            <Image
              src={assetImg(enrollment.course.image)}
              alt={enrollment.course.title}
              className="rounded-md"
            />
          </article>
        ) : (
          <article className="grid w-48 aspect-video place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <ImageIcon className="text-gray-500" />
          </article>
        )}

        <section className="flex gap-3 items-start py-2">
          <article className="flex flex-col gap-2">
            <CardTitle>
              {truncateString(enrollment.course.title, "lg")}
            </CardTitle>
            <CardDescription>
              {truncateString(enrollment.course.subtitle ?? "", "lg")}
            </CardDescription>
          </article>
        </section>
      </Card>

      <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
        <NavProgress studentId={studentId} />
        <section className="lg:col-span-5 gap-3 flex flex-col">
          <article className="flex gap-3">
            <Card className="min-w-44">
              <CardHeader>
                <section className="flex flex-col items-center gap-2">
                  <CardDescription className="font-bold text-lg text-center">
                    Clases completadas
                  </CardDescription>
                  <CardDescription className="flex items-center gap-3 font-bold text-4xl">
                    <FileVideo className="w-12 h-12" />4
                  </CardDescription>
                </section>
              </CardHeader>
            </Card>

            <Card className="min-w-44">
              <CardHeader>
                <section className="flex flex-col items-center gap-2 ">
                  <CardDescription className="font-bold text-lg text-center">
                    Quizzes completados
                  </CardDescription>
                  <CardDescription className="flex items-center gap-3 font-bold text-4xl">
                    <ClipboardList className="w-12 h-12" />3
                  </CardDescription>
                </section>
              </CardHeader>
            </Card>

            <Card className="min-w-44">
              <CardHeader>
                <section className="flex flex-col items-center gap-2">
                  <CardDescription className="font-bold text-lg text-center">
                    Puntos
                  </CardDescription>
                  <CardDescription className="flex items-center gap-3 font-bold text-4xl">
                    <Medal className="w-12 h-12" />
                    500
                  </CardDescription>
                </section>
              </CardHeader>
            </Card>
          </article>
        </section>
      </section>
    </>
  );
}
