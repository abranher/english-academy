"use client";

import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function AttachmentsContentSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <Skeleton className="w-48 p-4" />
        <Skeleton className="w-80 p-1" />
      </section>

      <Separator className="my-4" />

      <section className="flex">
        <article className="w-1/2">
          <Skeleton className="p-5" />
        </article>
        <article className="w-1/2 flex justify-end">
          <Skeleton className="p-5 w-40" />
        </article>
      </section>

      <section className="mt-4 flex justify-center sm:justify-start flex-wrap gap-4">
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            className="p-2 w-56 h-48 flex flex-col items-center gap-2"
          />
        ))}
      </section>
    </>
  );
}
