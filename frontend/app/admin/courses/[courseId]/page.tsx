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

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const courseResponse = await axios.get(`/api/courses/${params.courseId}`);
  const { data: levels } = await axios.get(`/api/levels/`);

  if (!courseResponse) {
    return redirect("/admin");
  }

  const requieredFields = [
    courseResponse.data.title,
    courseResponse.data.description,
    courseResponse.data.imageUrl,
    courseResponse.data.price,
    courseResponse.data.skillId,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields})`;

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Configuración del curso
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
        Personaliza tu curso
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <TitleForm
            initialData={courseResponse.data}
            courseId={courseResponse.data.id}
          />
          <DescriptionForm
            initialData={courseResponse.data}
            courseId={courseResponse.data.id}
          />
          <ImageForm
            initialData={courseResponse.data}
            courseId={courseResponse.data.id}
          />

          <LevelForm
            initialData={courseResponse.data}
            courseId={courseResponse.data.id}
            options={levels.map((level: any) => ({
              label: `${level.levelCode} - ${level.title}`,
              value: level.id,
            }))}
          />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          content
        </div>
      </div>
    </>
  );
}
