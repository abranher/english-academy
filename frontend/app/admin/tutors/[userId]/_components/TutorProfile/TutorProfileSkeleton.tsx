"use client";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function TutorProfileSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <Skeleton className="w-20 p-4" />
        <Skeleton className="w-20 p-1" />
      </section>

      <section className="w-full grid grid-cols-1 lg:grid-cols-7 gap-4">
        <section className="lg:col-span-2">
          <Skeleton className="w-full py-40" />
        </section>

        <section className="lg:col-span-5 gap-3 flex flex-col">
          <Skeleton className="w-full py-16" />
          <Skeleton className="w-full py-16" />
          <Skeleton className="w-full py-16" />
          <Skeleton className="w-full py-16" />
        </section>
      </section>
    </>
  );
}
