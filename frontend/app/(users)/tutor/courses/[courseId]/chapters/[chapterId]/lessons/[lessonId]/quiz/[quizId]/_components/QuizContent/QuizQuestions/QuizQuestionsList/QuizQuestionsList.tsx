"use client";

import { QuizQuestion } from "@/types/models";

import { QuizQuestionCard } from "./QuizQuestionCard";

export function QuizQuestionsList({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  return (
    <>
      {questions.map((question) => (
        <QuizQuestionCard key={question.id} quizQuestion={question} />
      ))}
    </>
  );
}
