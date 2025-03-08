"use client";

import Link from "next/link";

import { Course } from "@/types/models/Course";
import { assetImg } from "@/libs/asset";
import { truncateString } from "@/libs/format";
import { Image } from "@heroui/react";

import { ReviewStatusBadge } from "@/components/courses/ReviewStatusBadge";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { Button } from "@/components/shadcn/ui/button";
import { Clock, ImageIcon, MoreHorizontal, TextSearch } from "lucide-react";

export function MiniCourseCard({ course }: { course: Course }) {
  return (
    <>
      <Card className="flex flex-wrap items-start gap-5 p-3 relative">
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
            <CardTitle>{truncateString(course.title, "md")}</CardTitle>
            <CardDescription>
              {truncateString(course.subtitle ?? "", "md")}
            </CardDescription>
            <article className="flex">
              <ReviewStatusBadge status={course.reviewStatus} />
            </article>
          </article>
        </section>

        <section className="absolute right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-4 w-8 p-0" variant="ghost">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/tutor/courses/${course.id}`}>
                <DropdownMenuItem>
                  <TextSearch className="h-4 w-4 mr-2" />
                  Revisar
                </DropdownMenuItem>
              </Link>
              <Link
                href={`/admin/courses/reviews/${course.id}?courseTitle=${course.title}&tutor=`}
              >
                <DropdownMenuItem>
                  <Clock className="h-4 w-4 mr-2" />
                  Historial de revisiones
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </Card>
    </>
  );
}
