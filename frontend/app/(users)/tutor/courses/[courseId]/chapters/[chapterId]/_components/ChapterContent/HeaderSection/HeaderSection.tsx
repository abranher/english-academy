"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { MiniChapterPreviewCard } from "../MiniChapterPreviewCard";
import { ChapterActions } from "../ChapterActions";

import { Separator } from "@/components/shadcn/ui/separator";
import { Button } from "@/components/shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { ChevronLeft } from "lucide-react";

export function HeaderSection({ chapter }: { chapter: any }) {
  const { courseId } = useParams();

  const requieredFields = [chapter.title, chapter.description];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <MiniChapterPreviewCard chapter={chapter} />

      <Separator />

      <div className="flex items-center gap-4">
        <Link href={`/tutor/courses/${courseId}`}>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">atrás</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Configuración del capítulo
        </h1>
        <p className="flex-1 shrink-0 whitespace-nowrap tracking-tight">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{completionText}</TooltipTrigger>
              <TooltipContent>
                <p>Completa todos los campos.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <ChapterActions />
        </div>
      </div>
    </>
  );
}
