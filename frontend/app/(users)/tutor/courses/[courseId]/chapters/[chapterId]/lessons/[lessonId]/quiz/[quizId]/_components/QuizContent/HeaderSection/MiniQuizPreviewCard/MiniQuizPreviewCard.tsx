"use client";

import { Quiz } from "@/types/models";

export function MiniQuizPreviewCard({ lessonQuiz }: { lessonQuiz: Quiz }) {
  return (
    <>
      <section className="flex flex-wrap items-center gap-8">
        <article className="w-max flex gap-2">
          <h3 className="text-2xl font-bold">{lessonQuiz.title}</h3>
        </article>
      </section>
    </>
  );
}
