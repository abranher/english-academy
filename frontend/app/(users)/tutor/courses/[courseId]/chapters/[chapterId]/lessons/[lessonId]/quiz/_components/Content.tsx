"use client";

import { useState } from "react";

import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { cn } from "@/libs/shadcn/utils";
import Title from "@/components/common/Title";
import QuizDescriptionForm from "./QuizDescriptionForm";
import { useParams } from "next/navigation";
import { BookOpen, Globe } from "lucide-react";
import QuizTitleForm from "./QuizTitleForm";

// Define un tipo para las posibles claves de sectionTitles
type SectionTitleKey = "mainContent";

// Define el tipo del objeto sectionTitles
type SectionTitles = {
  [key in SectionTitleKey]: string;
};

const sectionTitles: SectionTitles = {
  mainContent: "Contenido principal",
};

export default function Content({ lesson }: { lesson: any }) {
  const [content, setContent] = useState<SectionTitleKey>("mainContent");

  const { chapterId, lessonId } = useParams();

  const handleNavigation = (value: SectionTitleKey) => {
    setContent(value);
  };

  return (
    <>
      <section className="w-full flex">
        <div className="lg:grid lg:grid-cols-4 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Card className="lg:col-span-3 flex w-full flex-col gap-4 p-5">
            <h2 className="text-2xl px-5 font-semibold flex gap-3 items-center">
              {content === "mainContent" ? <BookOpen /> : <Globe />}
              {sectionTitles[content]}
            </h2>
            <Separator />
            {content === "mainContent" && (
              <>
                <QuizTitleForm
                  initialData={lesson}
                  lessonId={lessonId as string}
                  quizId={lesson.quiz.id as string}
                />
                <Separator />

                <QuizDescriptionForm
                  initialData={lesson}
                  lessonId={lessonId as string}
                  quizId={lesson.quiz.id as string}
                />
                <Separator />
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
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
