"use client";

import { QuizQuestion } from "@/types/models";

import { QuizQuestionCard } from "./QuizQuestionCard";

export function QuizQuestionsList({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  return (
    <section className="flex flex-col gap-8">
      {questions.map((question, index) => (
        <QuizQuestionCard
          key={question.id}
          quizQuestion={question}
          index={index + 1}
        />
      ))}
    </section>
  );
}
