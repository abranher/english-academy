"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { LessonType } from "@/types/enums";
import { getEnrollment } from "@/services/network/enrollments";
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

import { ScrollArea } from "@/components/shadcn/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  ArrowUpRight,
  BookOpenText,
  ClipboardList,
  FileVideo,
  TableOfContents,
} from "lucide-react";

export function CourseNav({ studentId }: { studentId: string }) {
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
    queryKey: ["enrollment_course_navigation", courseId],
    queryFn: () => getEnrollment(studentId, courseId as string),
  });

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return (
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
  );
}
