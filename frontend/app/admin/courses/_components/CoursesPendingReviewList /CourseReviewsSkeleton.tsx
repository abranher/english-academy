import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CoursesPendingReviewListSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center py-4">
          <Skeleton className="flex h-10 w-full md:w-2/5 rounded-md px-3 py-2" />
        </div>
        <Skeleton className="h-10 py-2" />
        <Skeleton className="h-10 py-2" />
        <Skeleton className="h-10 py-2" />
        <Skeleton className="h-10 py-2" />
        <div className="flex justify-end gap-3 w-full">
          <Skeleton className="h-10 w-28 py-2" />
          <Skeleton className="h-10 w-28 py-2" />
        </div>
      </section>
    </>
  );
}
