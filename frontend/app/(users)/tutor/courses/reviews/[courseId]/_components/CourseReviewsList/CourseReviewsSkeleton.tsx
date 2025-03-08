import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function CourseReviewsSkeleton() {
  return (
    <>
      {[1, 2].map((item) => (
        <Skeleton key={item} className="py-20" />
      ))}
    </>
  );
}
