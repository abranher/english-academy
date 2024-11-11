import Link from "next/link";
import { redirect } from "next/navigation";

import axios from "@/config/axios";

import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import Actions from "./_components/Actions";
import AttachmentForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import LevelForm from "./_components/LevelForm";
import PriceForm from "./_components/PriceForm";
import TitleForm from "./_components/TitleForm";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Separator } from "@/components/shadcn/ui/separator";
import AlertBanner from "@/components/courses/tutor/AlertBanner";
import { Card } from "@/components/shadcn/ui/card";
import SideNav from "./_components/SideNav";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const { data: course } = await axios.get(`/api/courses/${params.courseId}`);
  const { data: levels } = await axios.get(`/api/levels/`);

  if (!course) {
    return redirect("/tutor");
  }

  const requieredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.levelId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-8">
          <div className="grid h-32 w-32 place-items-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
            <ImageIcon className="h-12 w-12 text-gray-500" />
          </div>
          <div className="w-max flex flex-col gap-2">
            <h3 className="text-2xl font-bold"> {course.title}</h3>

            <p className="text-md text-muted-foreground">
              {course.description
                ? course.description
                : "Aun no has agregado una descripción"}
            </p>
          </div>
        </div>

        <Separator />

        {!course.isPublished && (
          <AlertBanner label="Este curso no está publicado, por lo que no será visible para el estudiante." />
        )}
        <div className="flex items-center gap-4">
          <Link href={"/tutor/courses"}>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">atrás</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Configuración del curso
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
          {course.isPublished ? (
            <Badge variant="default" className="ml-auto sm:ml-0">
              Publicado
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-auto sm:ml-0">
              Borrador
            </Badge>
          )}
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Actions
              disabled={!isComplete}
              courseId={params.courseId}
              isPublished={course.isPublished}
            />
          </div>
        </div>

        <Separator className="my-6" />

        <section className="w-full flex justify-center">
          <div className="grid grid-cols-4 max-w-[1100px] space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <Card className="col-span-3 flex w-full flex-col gap-4">
              <TitleForm initialData={course} courseId={course.id} />
              <DescriptionForm initialData={course} courseId={course.id} />
              <ImageForm initialData={course} courseId={course.id} />
              <LevelForm
                initialData={course}
                courseId={course.id}
                options={levels.map((level: any) => ({
                  label: `${level.levelCode} - ${level.title}`,
                  value: level.id,
                }))}
              />
              <ChaptersForm initialData={course} courseId={course.id} />

              <PriceForm initialData={course} courseId={course.id} />
              <AttachmentForm initialData={course} courseId={course.id} />
            </Card>

            <aside className="col-span-1">
              <SideNav />
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
