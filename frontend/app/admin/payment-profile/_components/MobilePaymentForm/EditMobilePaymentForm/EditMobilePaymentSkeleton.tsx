"use client";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function EditMobilePaymentSkeleton() {
  return (
    <>
      <Skeleton className="p-2 w-20" />
      <Skeleton className="p-6" />

      <Skeleton className="p-2 w-20" />
      <Skeleton className="p-6" />

      <Skeleton className="p-2 w-20" />
      <Skeleton className="p-6" />
    </>
  );
}
