"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Class } from "@/types/models";

import { MiniClassPreviewCard } from "./MiniClassPreviewCard";
import { ClassActions } from "../ClassActions";

import { Separator } from "@/components/shadcn/ui/separator";
import { Button } from "@/components/shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { ChevronLeft } from "lucide-react";

export function HeaderSection({ lessonClass }: { lessonClass: Class }) {
  const { courseId, chapterId } = useParams();

  const requieredFields = [lessonClass.title, lessonClass.description];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <MiniClassPreviewCard lessonClass={lessonClass} />

      <Separator />

      <section className="flex items-center gap-4">
        <Link href={`/tutor/courses/${courseId}/chapters/${chapterId}`}>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">atrás</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Configuración de la Clase
        </h1>
        <article className="flex-1 shrink-0 whitespace-nowrap tracking-tight">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{completionText}</TooltipTrigger>
              <TooltipContent>
                <p>Completa todos los campos.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </article>

        <article className="hidden items-center gap-2 md:ml-auto md:flex">
          <ClassActions disabled={!isComplete} />
        </article>
      </section>
    </>
  );
}
