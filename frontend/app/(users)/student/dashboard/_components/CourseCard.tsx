import { IconBadge } from "@/components/icons/IconBadge";
import { formatPrice } from "@/libs/format";
import { generateBackendImageUrl } from "@/libs/utils/http";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  price: number;
  level: string;
}

export default function CourseCard({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  level,
}: CourseCardProps) {
  return (
    <>
      <Link href={`/student/courses/${id}`}>
        <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              fill
              className="object-cover"
              alt={title}
              src={generateBackendImageUrl(imageUrl)}
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
              {title}
            </div>
            <p className="text-xs text-muted-foreground">{level}</p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <IconBadge size="sm" icon={BookOpen} />
                <span>
                  {`${chaptersLength} ${
                    chaptersLength === 1 ? "Capítulo" : "Capítulos"
                  }`}
                </span>
              </div>
            </div>

            {/**
 * 
            {progress !== null ? (
              <CourseProgress
                variant={progress === 100 ? "success" : "default"}
                size="sm"
                value={progress}
              />
            ) : (
              <p className="text-md md:text-sm font-medium text-slate-700">
                {formatPrice(price)}
              </p>
            )}
            */}
          </div>
        </div>
      </Link>
    </>
  );
}
