"use client";

import Link from "next/link";

import { assetImg } from "@/libs/asset";
import { getEnrollments } from "@/services/network/enrollments";
import {
  Category,
  Course,
  Enrollment,
  Level,
  SubCategory,
} from "@/types/models";
import { Chip, Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";

export function Enrollments({ studentId }: { studentId: string }) {
  const {
    isPending,
    data: enrollments,
    isError,
  } = useQuery<
    | (Enrollment & {
        course: Course & {
          category: Category;
          subcategory: SubCategory;
          level: Level;
        };
      })[]
    | []
  >({
    queryKey: ["student_home", "get_enrollments"],
    queryFn: () => getEnrollments(studentId as string),
  });

  if (isPending) return <>Cragando...</>;
  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cursos inscritos</CardTitle>
      </CardHeader>
      <CardContent>
        {enrollments.length === 0 && (
          <CardDescription className="text-lg w-full italic">
            <p className="flex justify-center flex-col items-center">
              <FolderOpen className="w-20 h-20" />
              Sin cursos
            </p>
          </CardDescription>
        )}
        {enrollments.map((enrollment) => (
          <section key={enrollment.id}>
            <article className="col-span-7 flex items-start gap-4">
              <div className="aspect-video w-44 shrink-0">
                <Image
                  src={assetImg(enrollment.course.image)}
                  alt={enrollment.course.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-base font-bold text-gray-800 dark:text-zinc-50">
                  {`${enrollment.course.title} - ${enrollment.course.subtitle}`}
                </h3>

                <div className="flex gap-2">
                  <Chip color="danger" size="lg">
                    {enrollment.course.category.title}
                  </Chip>
                  <Chip color="primary" size="lg">
                    {enrollment.course.subcategory.title}
                  </Chip>
                </div>
              </div>

              <section className="px-3">
                <Link href={`/student/course/${enrollment.course.id}`}>
                  <Button size="icon" variant="ghost">
                    <ArrowRight />
                  </Button>
                </Link>
              </section>
            </article>

            <Separator className="my-3" />
          </section>
        ))}
      </CardContent>
    </Card>
  );
}
