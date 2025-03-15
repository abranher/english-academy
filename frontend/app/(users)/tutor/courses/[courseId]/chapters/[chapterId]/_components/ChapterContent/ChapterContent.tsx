"use client";

import { useParams } from "next/navigation";

import { useState } from "react";
import { cn } from "@/libs/shadcn/utils";
import { Chapter } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { getChapter } from "../../_services/get-chapter";

import { ChapterContentSkeleton } from "./ChapterContentSkeleton";
import { ChapterTitleForm } from "./ChapterTitleForm";
import { ChapterDescriptionForm } from "./ChapterDescriptionForm";
import { ChapterLessonsForm } from "./ChapterLessonsForm";
import { HeaderSection } from "./HeaderSection";
import { Title } from "@/components/common/Title";

import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { BookOpen, ClipboardPen, Globe } from "lucide-react";

// Define un tipo para las posibles claves de sectionTitles
type SectionTitleKey = "mainContent" | "lessons" | "studyPlan";

// Define el tipo del objeto sectionTitles
type SectionTitles = {
  [key in SectionTitleKey]: string;
};

const sectionTitles: SectionTitles = {
  mainContent: "Contenido principal",
  lessons: "Lecciones",
  studyPlan: "Plan de estudio",
};

export function ChapterContent() {
  const { chapterId, courseId } = useParams();

  const {
    isPending,
    data: chapter,
    isError,
  } = useQuery<Chapter>({
    queryKey: ["get_chapter", courseId, chapterId],
    queryFn: () => getChapter(chapterId as string, courseId as string),
  });

  const [content, setContent] = useState<SectionTitleKey>("mainContent");

  const handleNavigation = (value: SectionTitleKey) => {
    setContent(value);
  };

  if (isPending) return <ChapterContentSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar el capítulo</>;

  return (
    <>
      <HeaderSection chapter={chapter} />

      <Separator className="mb-3" />

      <section className="w-full flex">
        <div className="lg:grid lg:grid-cols-4 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Card className="lg:col-span-3 flex w-full flex-col gap-4 p-5">
            <h2 className="text-2xl px-5 font-semibold flex gap-3 items-center">
              {content === "mainContent" ? (
                <BookOpen />
              ) : content === "lessons" ? (
                <ClipboardPen />
              ) : (
                <Globe />
              )}
              {sectionTitles[content]}
            </h2>
            <Separator />
            {content === "mainContent" && (
              <>
                <ChapterTitleForm title={chapter.title} />

                <Separator />

                <ChapterDescriptionForm description={chapter.description} />
              </>
            )}
            {content === "lessons" && (
              <>
                <ChapterLessonsForm lessons={chapter.lessons} />
              </>
            )}
          </Card>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="group flex flex-col gap-4 py-2">
              <Title>
                <Globe />
                General
              </Title>

              <nav className="grid gap-3 px-2">
                <div
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "mainContent" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("mainContent")}
                >
                  <BookOpen />
                  Contenido principal
                </div>

                <div
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "lessons" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("lessons")}
                >
                  <ClipboardPen />
                  Lecciones
                </div>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
