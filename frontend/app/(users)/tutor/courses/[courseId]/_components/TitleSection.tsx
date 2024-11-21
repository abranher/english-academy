"use client";

import { Badge } from "@/components/shadcn/ui/badge";
import { assetImg } from "@/libs/asset";
import { Image } from "@nextui-org/react";
import { ImageIcon } from "lucide-react";

export default function TitleSection({ course }: { course: any }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-8">
        {course.image ? (
          <>
            <div className="aspect-video rounded-lg w-40">
              <Image
                src={assetImg(course.image)}
                alt={course.title}
                className="rounded-md"
              />
            </div>
          </>
        ) : (
          <div className="grid w-40 aspect-video place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <ImageIcon className="text-gray-500" />
          </div>
        )}

        <div className="w-max flex gap-2">
          <h3 className="text-2xl font-bold">{course.title}</h3>{" "}
          {course.isPublished ? (
            <Badge variant="default" className="ml-auto sm:ml-0">
              Publicado
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-auto sm:ml-0">
              Borrador
            </Badge>
          )}
        </div>
      </div>
    </>
  );
}
