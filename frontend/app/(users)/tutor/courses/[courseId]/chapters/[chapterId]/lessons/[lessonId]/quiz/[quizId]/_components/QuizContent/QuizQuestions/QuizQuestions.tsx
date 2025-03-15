"use client";

import { Quiz } from "@/types/models";

export function QuizQuestions({ lessonQuiz }: { lessonQuiz: Quiz }) {
  return (
    <>
      <div>{lessonQuiz.title}</div>
    </>
  );
}
