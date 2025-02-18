import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function StepEightSkeleton() {
  return (
    <>
      <section className="flex flex-col gap-2 mb-6">
        <Skeleton className="p-4" />
        <Skeleton className="p-2" />
      </section>

      <section className="flex gap-2 mb-6">
        <Skeleton className="p-3 w-full" />
        <Skeleton className="p-3 w-full" />
        <Skeleton className="p-3 w-full" />
      </section>

      <section className="flex gap-2 mb-6">
        <section className="flex w-full flex-col gap-2 mb-6">
          <Skeleton className="p-2 w-full" />
          <Skeleton className="p-4 w-full" />
        </section>

        <section className="flex w-full flex-col gap-2 mb-6">
          <Skeleton className="p-2 w-full" />
          <Skeleton className="p-4 w-full" />
        </section>
      </section>

      <section className="flex flex-col gap-2 mb-6">
        <Skeleton className="p-12 w-full" />
        <Skeleton className="p-5 w-full" />
      </section>

      <section className="flex w-full gap-2 mb-6">
        <Skeleton className="p-5 w-12" />
      </section>

      <section className="flex w-full justify-end mt-3">
        <Skeleton className="p-5 w-24" />
      </section>
    </>
  );
}
