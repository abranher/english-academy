"use client";

import { ReviewStatusBadge } from "@/components/courses/ReviewStatusBadge";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { assetImg } from "@/libs/asset";
import { truncateString } from "@/libs/format";
import { Course } from "@/types/models/Course";
import { Image } from "@heroui/react";
import { ImageIcon } from "lucide-react";

export default function TitleSection({ course }: { course: Course }) {
  return (
    <section className="flex flex-wrap items-start gap-5">
      {course.image ? (
        <article className="aspect-video rounded-lg w-48">
          <Image
            src={assetImg(course.image)}
            alt={course.title}
            className="rounded-md"
          />
        </article>
      ) : (
        <article className="grid w-48 aspect-video place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <ImageIcon className="text-gray-500" />
        </article>
      )}

      <section className="flex gap-3 items-start py-2">
        <article className="flex flex-col gap-2">
          <CardTitle>{truncateString(course.title, "lg")}</CardTitle>
          <CardDescription>
            {truncateString(course.subtitle ?? "", "lg")}
          </CardDescription>
          <article className="flex">
            <ReviewStatusBadge status={course.reviewStatus} />
          </article>
        </article>
      </section>
    </section>
  );
}
