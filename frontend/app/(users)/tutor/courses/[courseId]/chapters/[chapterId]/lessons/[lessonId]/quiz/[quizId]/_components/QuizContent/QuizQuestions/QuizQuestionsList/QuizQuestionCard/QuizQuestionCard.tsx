"use client";

import { QuizQuestion } from "@/types/models";

import { QuizQuestionForm } from "./QuizQuestionForm";

import { Card } from "@/components/shadcn/ui/card";

export function QuizQuestionCard({
  quizQuestion,
}: {
  quizQuestion: QuizQuestion;
}) {
  return (
    <>
      <Card className="p-4">
        <QuizQuestionForm quizQuestion={quizQuestion} />
      </Card>
    </>
  );
}
