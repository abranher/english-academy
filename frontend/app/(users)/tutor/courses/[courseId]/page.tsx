import { IconBadge } from "@/components/icons/IconBadge";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

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

        <Tabs defaultValue="general">
          <section className="flex justify-start gap-3 overflow-x-auto w-full">
            <TabsList className="my-6">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="courseContent">
                Contenido del Curso
              </TabsTrigger>
              <TabsTrigger value="courseImage">Imagen del Curso</TabsTrigger>
              <TabsTrigger value="price">Configuración del Precio</TabsTrigger>
              <TabsTrigger value="level">Nivel del Curso</TabsTrigger>
              <TabsTrigger value="attachment">
                Recursos y archivos adjuntos
              </TabsTrigger>
            </TabsList>
          </section>
          <TabsContent value="general">
            <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <TitleForm initialData={course} courseId={course.id} />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <DescriptionForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="courseContent">
            <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <ChaptersForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="courseImage">
            <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <ImageForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="price">
            <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <PriceForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="level">
            <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <LevelForm
                  initialData={course}
                  courseId={course.id}
                  options={levels.map((level: any) => ({
                    label: `${level.levelCode} - ${level.title}`,
                    value: level.id,
                  }))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attachment">
            <div className="grid gap-4 xl:grid-cols-2 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <AttachmentForm initialData={course} courseId={course.id} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
