import { IconBadge } from "@/components/icons/IconBadge";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import {
  ChevronLeft,
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import LevelForm from "./_components/LevelForm";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";
import ChaptersForm from "./_components/ChaptersForm";
import { Banner } from "@/components/shadcn/ui/banner";
import Actions from "./_components/Actions";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { Separator } from "@/components/shadcn/ui/separator";

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
        <div>
          <h3 className="text-2xl font-bold">{course.title}</h3>
          <p className="text-md text-muted-foreground">
            Listado de todos tus cursos.
          </p>
        </div>

        <Separator />

        {!course.isPublished && (
          <Banner label="Este curso no está publicado, por lo que no será visible para el estudiante." />
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

        <div className="flex items-center gap-2 my-3 whitespace-nowrap text-xl tracking-tight sm:grow-0">
          <IconBadge icon={LayoutDashboard} />
          Personaliza tu curso
        </div>

        <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
            <TitleForm initialData={course} courseId={course.id} />

            <DescriptionForm initialData={course} courseId={course.id} />

            <LevelForm
              initialData={course}
              courseId={course.id}
              options={levels.map((level: any) => ({
                label: `${level.levelCode} - ${level.title}`,
                value: level.id,
              }))}
            />

            <ImageForm initialData={course} courseId={course.id} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">Capítulos del curso</h2>
                </div>
                <ChaptersForm initialData={course} courseId={course.id} />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CircleDollarSign} />
                  <h2 className="text-xl">Vende tu curso</h2>
                </div>
                <PriceForm initialData={course} courseId={course.id} />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={File} />
                  <h2 className="text-xl">Recursos y archivos adjuntos</h2>
                </div>
                <AttachmentForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
