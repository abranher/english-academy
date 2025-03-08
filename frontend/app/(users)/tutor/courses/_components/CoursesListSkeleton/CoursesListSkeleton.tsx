"use client";

import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CoursesListSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <Skeleton className="w-48 p-4" />
        <Skeleton className="w-80 p-1" />
      </section>

      <Separator className="my-4" />

      <section className="flex flex-col gap-3">
        {[1, 2].map((item) => (
          <Skeleton key={item} className="w-full py-14" />
        ))}
      </section>
    </>
  );
}
