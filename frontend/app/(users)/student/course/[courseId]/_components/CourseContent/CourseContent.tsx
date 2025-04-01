"use client";

import { useParams } from "next/navigation";

import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Category,
  Chapter,
  Class,
  Course,
  Enrollment,
  Lesson,
  Level,
  Quiz,
  SubCategory,
} from "@/types/models";
import { Chip, Image } from "@heroui/react";
import { assetImg, assetVideo } from "@/libs/asset";
import { truncateString } from "@/libs/format";
import { getEnrollment } from "@/services/network/enrollments";

import { CourseNav } from "@/components/enrollments";
import { Metrics } from "./Metrics";

import Preview from "@/components/shadcn/ui/preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ImageIcon, Loader2, Video } from "lucide-react";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CourseContent({ studentId }: { studentId: string }) {
  const [playerReady, setPlayerReady] = useState(false);

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
        chapters: (Chapter & {
          lessons: (Lesson & {
            class: Class;
            quiz: Quiz;
          })[];
        })[];
      };
    }
  >({
    queryKey: ["enrollment_course_datails", courseId],
    queryFn: () => getEnrollment(studentId, courseId as string),
  });

  useEffect(() => {
    setPlayerReady(true);
  }, []);

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return (
    <>
      <section className="flex flex-wrap items-start gap-5 relative">
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

            <article className="flex gap-2">
              <Chip color="danger" size="lg">
                {enrollment.course.category.title}
              </Chip>
              <Chip color="primary" size="lg">
                {enrollment.course.subcategory.title}
              </Chip>
            </article>
          </article>
        </section>
      </section>
      <Separator />

      <Metrics studentId={studentId} />
      <Separator />

      <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
        <section className="lg:col-span-5 gap-3 flex flex-col">
          <section className="aspect-video">
            {enrollment.course.trailer ? (
              <>
                {playerReady ? (
                  <article className="aspect-video rounded-lg">
                    <ReactPlayer
                      controls
                      width={"100%"}
                      height={"100%"}
                      url={assetVideo(enrollment.course.trailer)}
                    />
                  </article>
                ) : (
                  <Skeleton className="w-full h-full flex justify-center items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </Skeleton>
                )}
              </>
            ) : (
              <div className="grid aspect-video place-items-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
                <Video className="h-9 w-9 text-gray-600 aspect-video" />
              </div>
            )}
          </section>

          <section className="flex flex-col p-3 gap-4">
            {enrollment.course.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <Preview value={enrollment.course.description} />
                </CardContent>
              </Card>
            )}

            {enrollment.course.learningObjectives && (
              <Card>
                <CardHeader>
                  <CardTitle>Objetivos de Aprendizaje</CardTitle>
                  <Preview value={enrollment.course.learningObjectives} />
                </CardHeader>
              </Card>
            )}
          </section>
        </section>

        <CourseNav studentId={studentId} />
      </section>
    </>
  );
}
