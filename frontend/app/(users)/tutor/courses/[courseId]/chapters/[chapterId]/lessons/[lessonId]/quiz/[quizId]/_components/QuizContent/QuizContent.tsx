"use client";

import { useParams } from "next/navigation";

import { cn } from "@/libs/shadcn/utils";
import { Quiz } from "@/types/models";
import { useState } from "react";
import { getQuiz } from "../../_services/get-quiz";
import { useQuery } from "@tanstack/react-query";

import { Title } from "@/components/common/Title";
import { QuizContentSkeleton } from "./QuizContentSkeleton";
import { HeaderSection } from "./HeaderSection";
import { QuizTitleForm } from "./QuizTitleForm";
import { QuizDescriptionForm } from "./QuizDescriptionForm";
import { QuizQuestions } from "./QuizQuestions";

import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { BookOpen, FileQuestion, Globe } from "lucide-react";

type SectionTitleKey = "MAIN_CONTENT" | "QUESTIONS";

type SectionTitles = {
  [key in SectionTitleKey]: string;
};

const sectionTitles: SectionTitles = {
  MAIN_CONTENT: "Contenido principal",
  QUESTIONS: "Preguntas",
};

export function QuizContent() {
  const { quizId, lessonId } = useParams();

  const {
    isPending,
    data: lessonQuiz,
    isError,
  } = useQuery<Quiz>({
    queryKey: ["get_quiz", quizId, lessonId],
    queryFn: () => getQuiz(quizId as string, lessonId as string),
  });

  const [content, setContent] = useState<SectionTitleKey>("MAIN_CONTENT");

  const handleNavigation = (value: SectionTitleKey) => {
    setContent(value);
  };

  if (isPending) return <QuizContentSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar el quiz</>;

  return (
    <>
      <HeaderSection lessonQuiz={lessonQuiz} />

      <Separator className="mb-3" />

      <section className="w-full flex">
        <div className="lg:grid lg:grid-cols-4 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Card className="lg:col-span-3 flex w-full flex-col gap-4 p-5">
            <h2 className="text-2xl px-5 font-semibold flex gap-3 items-center">
              {content === "MAIN_CONTENT" ? (
                <BookOpen />
              ) : content === "QUESTIONS" ? (
                <FileQuestion />
              ) : (
                <Globe />
              )}
              {sectionTitles[content]}
            </h2>
            <Separator />
            {content === "MAIN_CONTENT" && (
              <>
                <QuizTitleForm title={lessonQuiz.title} />
                <Separator />

                <QuizDescriptionForm description={lessonQuiz.description} />
                <Separator />
              </>
            )}
            {content === "QUESTIONS" && (
              <>
                <QuizQuestions lessonQuiz={lessonQuiz} />
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
                <section
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "MAIN_CONTENT" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("MAIN_CONTENT")}
                >
                  <BookOpen />
                  Contenido principal
                </section>

                <section
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "QUESTIONS" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("QUESTIONS")}
                >
                  <FileQuestion />
                  Preguntas
                </section>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
