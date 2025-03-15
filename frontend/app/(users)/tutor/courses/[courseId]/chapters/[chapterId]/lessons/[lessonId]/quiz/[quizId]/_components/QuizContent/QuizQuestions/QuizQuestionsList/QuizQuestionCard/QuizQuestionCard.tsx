"use client";

import { QuizQuestion } from "@/types/models";

import { QuizQuestionForm } from "./QuizQuestionForm";
import { QuizQuestionOptionsList } from "./QuizQuestionOptionsList";

import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";

export function QuizQuestionCard({
  quizQuestion,
}: {
  quizQuestion: QuizQuestion;
}) {
  return (
    <>
      <Card className="p-6 flex flex-col gap-6">
        <QuizQuestionForm quizQuestion={quizQuestion} />

        <Separator />

        <QuizQuestionOptionsList quizQuestion={quizQuestion} />
      </Card>
    </>
  );
}
