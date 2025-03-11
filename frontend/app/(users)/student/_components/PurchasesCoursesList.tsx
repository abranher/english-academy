"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import { Card } from "@/components/shadcn/ui/card";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import axios from "@/config/axios";
import { assetImg } from "@/libs/asset";
import { Chip, Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

export default function PurchasesCoursesList({
  studentId,
}: {
  studentId: string;
}) {
  const {
    isPending,
    error,
    data: purchases,
  } = useQuery({
    queryKey: ["purchases-courses"],
    queryFn: async () => {
      const response = await axios.get(`/api/purchases/student/${studentId}`);
      return response.data;
    },
  });
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {isPending ? (
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
        ) : (
          <>
            {purchases.length != 0 &&
              purchases.map((purchase: any) => (
                <Card key={purchase.id}>
                  <div className="relative aspect-video m-2.5 overflow-hidden text-white rounded-md">
                    <Image
                      src={assetImg(purchase.course.image)}
                      alt="card-image"
                    />
                  </div>

                  <div className="px-4">
                    <h6 className="mb-2 text-zinc-800 dark:text-zinc-50 text-xl md:text-md font-semibold">
                      {purchase.course.title}
                    </h6>
                  </div>

                  <div className="px-4 flex gap-2">
                    <Chip color="danger" size="lg">
                      {purchase.course.category?.title}
                    </Chip>
                    <Chip color="primary" size="lg">
                      {purchase.course.subcategory?.title}
                    </Chip>
                  </div>

                  <div className="p-4 w-full">
                    <Link href={`/student/courses/${purchase.course.id}`}>
                      <Button className="flex gap-2 w-full">
                        Continuar...
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
          </>
        )}
      </div>
    </>
  );
}
