"use client";

import Box from "@/components/common/Box";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion";
import axios from "@/config/axios";
import { LessonType } from "@/types/enums";
import { Chapter } from "@/types/models/Chapter";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ClipboardList, FileVideo } from "lucide-react";
import { useParams } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { courseId } = useParams();

  const {
    isPending,
    error,
    data: course,
  } = useQuery({
    queryKey: ["course-purchased-layout"],
    queryFn: async () => {
      const response = await axios.get(
        `/api/course-enrollments/course/${courseId}`
      );
      return response.data;
    },
  });

  return (
    <>
      <Box>
        <div className="space-y-6 p-6">
          {/* Contenedor con grilla ajustada */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            {children}

            <div>
              <h2 className="text-2xl font-semibold py-3">Capítulos</h2>

              <Accordion type="single" collapsible className="w-full">
                {!isPending ? (
                  <>
                    {course.chapters.map((chapter: Chapter) => (
                      <>
                        <AccordionItem
                          key={chapter.id}
                          value={chapter.id}
                          className="border px-4"
                        >
                          <AccordionTrigger>
                            <div className="flex gap-4">
                              <BookOpen />
                              {chapter.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <section className="flex flex-col">
                              {chapter.lessons.map((lesson) => (
                                <>
                                  <div
                                    key={lesson.id}
                                    className="flex gap-4 text-lg border p-4"
                                  >
                                    {lesson.type === LessonType.CLASS && (
                                      <>
                                        <FileVideo className="h-5 w-5" />
                                        {`Clase: ${lesson.class.title}`}
                                      </>
                                    )}

                                    {lesson.type === LessonType.QUIZ && (
                                      <>
                                        <ClipboardList className="h-5 w-5" />
                                        {`Quiz: ${lesson.quiz.title}`}
                                      </>
                                    )}
                                  </div>
                                </>
                              ))}
                            </section>
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
