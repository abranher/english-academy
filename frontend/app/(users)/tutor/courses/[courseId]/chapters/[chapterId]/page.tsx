import Link from "next/link";
import { redirect } from "next/navigation";

import axios from "@/config/axios";

import { Button } from "@/components/shadcn/ui/button";
import { ChevronLeft } from "lucide-react";
import ChapterActions from "./_components/ChapterActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Separator } from "@/components/shadcn/ui/separator";
import Content from "./_components/Content";
import TitleSection from "./_components/TitleSection";

export default async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) {
  const { data: chapter } = await axios.get(
    `/api/chapters/${params.chapterId}/course/${params.courseId}`
  );

  if (!chapter) {
    return redirect("/tutor/courses");
  }

  const requieredFields = [
    chapter.title,
    chapter.description,
    //chapter.video,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <div className="space-y-6">
        <TitleSection chapter={chapter} />

        <Separator />

        <div className="flex items-center gap-4">
          <Link href={`/tutor/courses/${params.courseId}`}>
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
            <ChapterActions
              disabled={!isComplete}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={chapter.isPublished}
            />
          </div>
        </div>

        <Separator className="my-6" />

        <Content chapter={chapter} />
      </div>
    </>
  );
}
