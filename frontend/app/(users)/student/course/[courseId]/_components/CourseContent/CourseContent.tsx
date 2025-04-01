"use client";

import Link from "next/link";
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
import { LessonType } from "@/types/enums";
import { Chip, Image } from "@heroui/react";
import { assetImg, assetVideo } from "@/libs/asset";
import { truncateString } from "@/libs/format";
import { getEnrollment } from "@/services/network/enrollments";

import Preview from "@/components/shadcn/ui/preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ArrowUpRight,
  BookOpenText,
  ClipboardList,
  FileVideo,
  ImageIcon,
  Loader2,
  Medal,
  TableOfContents,
  Video,
} from "lucide-react";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { ScrollArea } from "@/components/shadcn/ui/scroll-area";

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

      <article className="flex gap-3 items-center">
        <Card className="w-full">
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

        <Card className="w-full">
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

        <Card className="w-full">
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
      </article>
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

        <ScrollArea className="lg:col-span-3 h-[330px] rounded-md">
          <section className="flex flex-col gap-3">
            <article>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <TableOfContents />
                    Contenido del curso
                  </CardTitle>
                </CardHeader>
              </Card>
            </article>
            <article className="flex flex-col gap-3">
              {enrollment.course.chapters.map((chapter) => (
                <Card key={chapter.id}>
                  <CardHeader>
                    <section className="flex">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <BookOpenText className="w-5 h-5" />
                        {chapter.title}
                      </CardTitle>

                      <article className="ml-auto flex items-center gap-x-2">
                        <ArrowUpRight className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                      </article>
                    </section>
                  </CardHeader>
                  <CardContent>
                    {chapter.lessons.map((lesson) => (
                      <section
                        key={lesson.id}
                        className="flex items-center gap-x-2 border rounded-md text-sm bg-zinc-100 border-zinc-200 text-zinc-700"
                      >
                        <article className="px-2 py-3 border-r rounded-l-md transition border-r-zinc-200 hover:bg-zinc-200">
                          {lesson.type === LessonType.CLASS && (
                            <FileVideo className="h-5 w-5" />
                          )}

                          {lesson.type === LessonType.QUIZ && (
                            <ClipboardList className="h-5 w-5" />
                          )}
                        </article>

                        {lesson.type === LessonType.CLASS && (
                          <h3 className="font-bold">
                            Clase: {lesson.class.title ?? "N/A"}
                          </h3>
                        )}
                        {lesson.type === LessonType.QUIZ && (
                          <h3 className="font-bold">
                            Quiz: {lesson.quiz.title ?? "N/A"}
                          </h3>
                        )}

                        {lesson.type === LessonType.CLASS && (
                          <article className="ml-auto p-4 flex items-center gap-x-4">
                            <Link
                              href={`/student/course/${courseId}/chapter/${chapter.id}/lesson/${lesson.id}/class/${lesson.class.id}`}
                            >
                              <ArrowUpRight className="w-4 h-4 cursor-pointer hover:opacity-75 transition" />
                            </Link>
                          </article>
                        )}
                      </section>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </article>
          </section>
        </ScrollArea>
      </section>
    </>
  );
}
