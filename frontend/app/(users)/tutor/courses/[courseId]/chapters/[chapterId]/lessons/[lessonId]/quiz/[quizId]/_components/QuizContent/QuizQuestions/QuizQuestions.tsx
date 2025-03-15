"use client";

import { Quiz } from "@/types/models";

import { CreateQuestionModal } from "./CreateQuestionModal";
import { QuizQuestionsList } from "./QuizQuestionsList";

import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { FolderOpen } from "lucide-react";

export function QuizQuestions({ lessonQuiz }: { lessonQuiz: Quiz }) {
  return (
    <>
      <CardContent className="relative">
        <CardTitle className="flex justify-between gap-3 text-lg mb-3">
          Preguntas del quiz
        </CardTitle>

        <CardDescription>
          Es hora de crear ejercicios prácticos que refuercen el aprendizaje del
          capítulo.
        </CardDescription>

        <section className="my-6">
          {lessonQuiz.questions.length === 0 && (
            <CardDescription className="text-lg w-full">
              <p className="flex justify-center flex-col items-center italic">
                <FolderOpen className="w-20 h-20" />
                Sin preguntas
              </p>
            </CardDescription>
          )}
          <QuizQuestionsList questions={lessonQuiz.questions} />
        </section>

        <CreateQuestionModal />
      </CardContent>
    </>
  );
}
