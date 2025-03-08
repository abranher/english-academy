import Link from "next/link";
import { redirect } from "next/navigation";

import axios from "@/config/axios";

import Content from "./_components/Content";
import TitleSection from "./_components/TitleSection";
import Actions from "./_components/Actions";

import { Button } from "@/components/shadcn/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { Separator } from "@/components/shadcn/ui/separator";
import { AlertBanner } from "@/components/common/AlertBanner";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const { data: course } = await axios.get(`/api/courses/${params.courseId}`);

  if (!course) {
    return redirect("/tutor/courses");
  }

  const requieredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.levelId,
    course.chapters.some((chapter: any) => chapter.isPublished),
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/courses">Cursos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Curso</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TitleSection course={course} />

      <Separator />

      {!course.isPublished && (
        <AlertBanner
          label={
            "Este curso aun no está aprobado, por lo que no será visible para el estudiante."
          }
        />
      )}
      <section className="flex items-center gap-4">
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

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Actions
            disabled={!isComplete}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
        </div>
      </section>

      <Separator className="mb-3" />

      <Content course={course} />
    </>
  );
}
