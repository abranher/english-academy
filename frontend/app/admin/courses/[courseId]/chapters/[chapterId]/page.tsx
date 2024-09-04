import { IconBadge } from "@/components/icons/IconBadge";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";

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
    return redirect("/admin");
  }

  const requieredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <>
      <div className="flex items-center gap-4">
        <Link href={`/admin/courses/${params.courseId}`}>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">atrás</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Configuración del capítulo
        </h1>
        <p className="flex-1 shrink-0 whitespace-nowrap tracking-tight">
          Complete all fields {completionText}
        </p>
        <Badge variant="outline" className="ml-auto sm:ml-0">
          In stock
        </Badge>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button size="sm">Save Product</Button>
        </div>
      </div>

      <div className="flex items-center gap-2 my-3 whitespace-nowrap text-xl tracking-tight sm:grow-0">
        <IconBadge icon={LayoutDashboard} />
        Personaliza tu capítulo
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
          <ChapterTitleForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />

          <ChapterDescriptionForm
            initialData={chapter}
            courseId={params.courseId}
            chapterId={params.chapterId}
          />
          {/*
          
          <LevelForm
            initialData={course}
            courseId={course.id}
            options={levels.map((level: any) => ({
              label: `${level.levelCode} - ${level.title}`,
              value: level.id,
            }))}
          />

          <ImageForm initialData={course} courseId={course.id} />
        */}
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
          {/*
        
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

        */}
        </div>
      </div>
    </>
  );
}
