"use client";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function InfoCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton key={item} className="rounded-lg py-16" />
      ))}
    </div>
  );
}
