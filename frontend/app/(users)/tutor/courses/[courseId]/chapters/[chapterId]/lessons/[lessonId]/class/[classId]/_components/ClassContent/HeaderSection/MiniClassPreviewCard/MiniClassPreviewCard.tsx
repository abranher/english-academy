"use client";

import { Class } from "@/types/models";

export function MiniClassPreviewCard({ lessonClass }: { lessonClass: Class }) {
  return (
    <>
      <section className="flex flex-wrap items-center gap-8">
        <article className="w-max flex gap-2">
          <h3 className="text-2xl font-bold">{lessonClass.title}</h3>
        </article>
      </section>
    </>
  );
}
