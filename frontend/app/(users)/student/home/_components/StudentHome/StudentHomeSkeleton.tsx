"use client";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function StudentHomeSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <Skeleton className="w-40 p-4" />
        <Skeleton className="w-96 p-1" />
      </section>

      <section className="w-full grid grid-cols-1 lg:grid-cols-8 gap-4">
        <section className="lg:col-span-3">
          <Skeleton className="w-full py-52" />
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
