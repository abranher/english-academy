"use client";

import { QuizQuestion } from "@/types/models";

import { QuizQuestionForm } from "./QuizQuestionForm";
import { QuizQuestionOptionsList } from "./QuizQuestionOptionsList";
import { CorrectOptionForm } from "./CorrectOptionForm";
import { QuizQuestionHeader } from "./QuizQuestionHeader";

import { Separator } from "@/components/shadcn/ui/separator";
import { Card } from "@/components/shadcn/ui/card";

export function QuizQuestionCard({
  quizQuestion,
  index,
}: {
  quizQuestion: QuizQuestion;
  index: number;
}) {
  return (
    <>
      <Card className="p-6 flex flex-col gap-6">
        <QuizQuestionHeader quizQuestion={quizQuestion} index={index} />

        <QuizQuestionForm quizQuestion={quizQuestion} />
        <Separator />

        <QuizQuestionOptionsList quizQuestion={quizQuestion} />

        <CorrectOptionForm quizQuestion={quizQuestion} />
      </Card>
    </>
  );
}
