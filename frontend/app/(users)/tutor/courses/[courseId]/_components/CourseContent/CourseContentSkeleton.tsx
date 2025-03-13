"use client";

import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CourseContentSkeleton() {
  return (
    <>
      <section className="flex flex-wrap items-start gap-5">
        <article className="aspect-video rounded-lg w-48">
          <Skeleton className="py-14" />
        </article>

        <section className="flex gap-3 items-start py-2">
          <article className="flex flex-col gap-2">
            <Skeleton className="py-3 w-44" />
            <Skeleton className="py-2 w-40" />
            <Skeleton className="py-4 rounded-2xl w-24" />
          </article>
        </section>
      </section>

      <Separator />

      <section className="flex justify-between">
        <article className="w-full flex items-center">
          <Skeleton className="py-3 w-1/2" />
        </article>
        <article className="flex gap-3 items-center">
          <article>
            <Skeleton className="py-4 rounded-2xl w-24" />
          </article>
          <Skeleton className="py-5 w-28" />
        </article>
      </section>

      <Separator />

      <section className="lg:grid lg:grid-cols-4 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <article className="lg:col-span-3 flex w-full flex-col gap-4">
          <Skeleton className="py-96 w-full" />
        </article>
        <article className="hidden lg:block lg:col-span-1">
          <Skeleton className="w-full py-40" />
        </article>
      </section>
    </>
  );
}
