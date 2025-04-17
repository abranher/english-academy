"use client";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CourseMetricsSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <Skeleton className="h-7 w-60" />

      <section className="grid gap-6 xl:grid-cols-2">
        <Skeleton className="h-[420px]" />
        <Skeleton className="h-[420px]" />
      </section>
    </section>
  );
}
