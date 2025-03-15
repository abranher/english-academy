"use client";

import { Chapter } from "@/types/models";

export function MiniChapterPreviewCard({ chapter }: { chapter: Chapter }) {
  return (
    <>
      <section className="flex flex-wrap items-center gap-8">
        <article className="w-max flex gap-2">
          <h3 className="text-2xl font-bold">{chapter.title}</h3>
        </article>
      </section>
    </>
  );
}
