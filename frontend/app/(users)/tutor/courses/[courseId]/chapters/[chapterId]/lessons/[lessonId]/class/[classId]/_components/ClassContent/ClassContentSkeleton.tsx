"use client";

import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function ClassContentSkeleton() {
  return (
    <>
      <section className="flex flex-wrap items-start gap-5">
        <Skeleton className="py-4 w-44" />
      </section>

      <Separator />

      <section className="flex justify-between">
        <article className="w-full flex items-center">
          <Skeleton className="py-3 w-1/2" />
        </article>
        <article className="flex gap-3 items-center">
          <Skeleton className="py-5 w-12" />
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
