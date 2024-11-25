import { redirect } from "next/navigation";
import Link from "next/link";
import axios from "@/config/axios";

import { Button } from "@/components/shadcn/ui/button";
import { ChevronLeft } from "lucide-react";
import ClassActions from "./_components/ClassActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Separator } from "@/components/shadcn/ui/separator";
import TitleSection from "./_components/TitleSection";
import Content from "./_components/Content";

export default async function ChapterIdPage({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
    lessonId: string;
  };
}) {
  const { data: lesson } = await axios.get(
    `/api/lessons/${params.lessonId}/chapter/${params.chapterId}`
  );

  if (!lesson) {
    return redirect("/tutor/courses");
  }

  const requieredFields = [
    lesson.title,
    lesson.description,
    //lesson.video,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <div className="space-y-6">
        <TitleSection lesson={lesson} />

        <Separator />

        <div className="flex items-center gap-4">
          <Link
            href={`/tutor/courses/${params.courseId}/chapters/${params.chapterId}`}
          >
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">atrás</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Configuración de la Clase
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
            <ClassActions
              disabled={!isComplete}
              courseId={params.courseId}
              chapterId={params.chapterId}
              isPublished={lesson.isPublished}
            />
          </div>
        </div>

        <Separator className="my-6" />

        <Content lesson={lesson} />
      </div>
    </>
  );
}
