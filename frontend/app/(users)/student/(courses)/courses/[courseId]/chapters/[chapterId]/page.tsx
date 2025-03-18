"use client";

import { Card, CardTitle } from "@/components/shadcn/ui/card";
import Preview from "@/components/shadcn/ui/preview";
import axios from "@/config/axios";
import { Chapter } from "@/types/models/Chapter";
import { useQuery } from "@tanstack/react-query";
import { Video } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChapterIdPage() {
  const [chapter, setChapter] = useState();
  const { courseId, chapterId } = useParams();

  const {
    isPending,
    error,
    data: course,
  } = useQuery({
    queryKey: ["course-purchased-chapter-page"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/course-enrollments/course/${courseId}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (!course) return;

    const filteredChapter = course.chapters.find(
      (chapter: Chapter) => chapter.id === chapterId
    );
    setChapter(filteredChapter || null);
  }, [course, chapterId]);

  return (
    <>
      {!isPending ? (
        <>
          {chapter && (
            <>
              <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
                <h2 className="text-2xl font-semibold">{chapter.title}</h2>
                <section>
                  <Preview value={chapter.description} />
                </section>
                <h2 className="text-xl font-semibold">Aprenderás</h2>
                <section>
                  <Preview value={chapter.learningObjectives} />
                </section>

                <h2 className="text-2xl font-semibold">Lecciones</h2>

                <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                  {chapter &&
                    chapter.lessons.map((lesson: any, index: any) => (
                      <Card key={lesson.id}>
                        <Link
                          href={`/student/courses/${courseId}/chapters/${chapter.id}/lessons/${lesson.id}/class`}
                        >
                          <div className="flex flex-col gap-2 items-center py-4">
                            <Video className="h-9 w-9 text-muted-foreground" />
                            <CardTitle className="text-sm font-medium">
                              Clase {index + 1}
                            </CardTitle>
                            <div className="text-lg font-bold">
                              {lesson.class?.title}
                            </div>
                          </div>
                        </Link>
                      </Card>
                    ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
            <h2>{}</h2>
          </div>
        </>
      )}
    </>
  );
}
