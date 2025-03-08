"use client";

import { ReviewStatusBadge } from "@/components/courses/ReviewStatusBadge";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { assetImg } from "@/libs/asset";
import { Image } from "@heroui/react";
import { ImageIcon } from "lucide-react";

export default function TitleSection({ course }: { course: any }) {
  return (
    <section className="flex flex-wrap items-start gap-8">
      {course.image ? (
        <article className="aspect-video rounded-lg w-40">
          <Image
            src={assetImg(course.image)}
            alt={course.title}
            className="rounded-md"
          />
        </article>
      ) : (
        <article className="grid w-40 aspect-video place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <ImageIcon className="text-gray-500" />
        </article>
      )}

      <section className="flex gap-5 items-start py-2">
        <article className="flex flex-col gap-2">
          <CardTitle>{course.title}</CardTitle>
          <CardDescription>{course.subtitle}</CardDescription>
        </article>
        <ReviewStatusBadge status={course.reviewStatus} />
      </section>
    </section>
  );
}
