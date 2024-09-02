import { IconBadge } from "@/components/icons/IconBadge";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";

export default async function CourseIdPage({
  params,
}: {
  params: {
    courseId: string;
  };
}) {
  const response = await axios.get(`/api/courses/${params.courseId}`);

  if (!response) {
    return redirect("/admin");
  }

  const requieredFields = [
    response.data.title,
    response.data.description,
    response.data.imageUrl,
    response.data.price,
    response.data.skillId,
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
          <TitleForm initialData={response.data} courseId={response.data.id} />
          <DescriptionForm
            initialData={response.data}
            courseId={response.data.id}
          />
          <ImageForm initialData={response.data} courseId={response.data.id} />
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          content
        </div>
      </div>
    </>
  );
}
