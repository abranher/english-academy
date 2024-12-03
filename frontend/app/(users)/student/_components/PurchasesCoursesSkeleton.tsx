import Box from "@/components/common/Box";
import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export default function PurchasesCoursesSkeleton() {
  return (
    <>
      <Box>
        <div className="space-y-6 p-6">
          {/* Contenedor con grilla ajustada */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
            <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3 px-24">
                <Card x-chunk="dashboard-01-chunk-0">
                  <Skeleton className="w-full h-32" />
                </Card>
                <Card x-chunk="dashboard-01-chunk-1">
                  <Skeleton className="w-full h-32" />
                </Card>
                <Card x-chunk="dashboard-01-chunk-2">
                  <Skeleton className="w-full h-32" />
                </Card>
              </div>

              <Skeleton className="w-full h-10" />

              <Separator className="my-4" />

              <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      className="p-3 md:basis-1/2 lg:basis-1/3 flex flex-col gap-3 mt-1"
                      key={index}
                    >
                      <Skeleton className="w-full h-52" />
                      <Skeleton className="w-full h-10" />
                      <Skeleton className="w-full h-10" />
                    </div>
                  ))}
                </>
              </div>
            </div>

            <div className="h-32 rounded-lg">
              <Card>
                <section className="flex flex-col items-center gap-3 w-full py-9 px-3">
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </section>
              </Card>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
