"use client";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { QuizQuestion } from "@/types/models";
import { CreateOptionModal } from "./CreateOptionModal";
import { QuizQuestionOptionForm } from "./QuizQuestionOptionForm";
import { FolderOpen } from "lucide-react";

export function QuizQuestionOptionsList({
  quizQuestion,
}: {
  quizQuestion: QuizQuestion;
}) {
  return (
    <>
      <section>
        <CardTitle className="text-base">Opciones:</CardTitle>

        <section className="my-6">
          {quizQuestion.options.length === 0 && (
            <CardDescription className="text-sm w-full">
              <p className="flex justify-center flex-col items-center italic">
                <FolderOpen className="w-4 h-4" />
                Sin opciones
              </p>
            </CardDescription>
          )}
          {quizQuestion.options.map((option) => (
            <QuizQuestionOptionForm
              key={option.id}
              option={option}
              quizQuestionId={quizQuestion.id}
            />
          ))}
        </section>

        {quizQuestion.options.length < 4 && (
          <CreateOptionModal quizQuestionId={quizQuestion.id} />
        )}
      </section>
    </>
  );
}
