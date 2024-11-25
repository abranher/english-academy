"use client";

import { Badge } from "@/components/shadcn/ui/badge";
import { assetImg } from "@/libs/asset";
import { Image } from "@nextui-org/react";
import { ImageIcon } from "lucide-react";

export default function TitleSection({ chapter }: { chapter: any }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-8">
        <div className="w-max flex gap-2">
          <h3 className="text-2xl font-bold">{chapter.title}</h3>{" "}
          {chapter.isPublished ? (
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
