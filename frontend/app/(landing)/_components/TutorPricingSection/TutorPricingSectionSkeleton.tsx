"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import BoxBase from "@/components/common/BoxBase";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

export function TutorPricingSectionSkeleton() {
  return (
    <>
      <BoxBase size="xl">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem
                  className="p-3 md:basis-1/2 lg:basis-1/3 flex flex-col gap-3 mt-1"
                  key={index}
                >
                  <Skeleton className="w-full h-52" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </CarouselItem>
              ))}
            </>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </BoxBase>
    </>
  );
}
