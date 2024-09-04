import { IconBadge } from "@/components/icons/IconBadge";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { ChevronLeft, Eye, LayoutDashboard, ListChecks } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import { Banner } from "@/components/shadcn/ui/banner";
import ChapterActions from "./_components/ChapterActions";

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
    //chapter.videoUrl,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="Este capítulo no está publicado. No será visible en el curso."
        />
      )}
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
          <ChapterActions
            disabled={!isComplete}
            courseId={params.courseId}
            chapterId={params.chapterId}
            isPublished={chapter.isPublished}
          />
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

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">Configuración de acceso</h2>
              </div>

              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>

        <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Añadir un video</h2>
              </div>
              <ChapterVideoForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
