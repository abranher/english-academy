"use client";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CourseLevelSkeleton() {
  return (
    <>
      <Skeleton className="py-5" />
      <Skeleton className="py-2" />
      <Skeleton className="h-10 w-20 py-2" />
    </>
  );
}
