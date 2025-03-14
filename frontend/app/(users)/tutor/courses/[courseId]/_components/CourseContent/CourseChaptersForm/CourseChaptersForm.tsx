"use client";

import { useParams, useRouter } from "next/navigation";

import axios from "@/config/axios";
import { toast } from "sonner";
import { Chapter } from "@/types/models";
import { Spinner } from "@heroui/react";
import { useState } from "react";

import { CourseChaptersList } from "./CourseChaptersList";
import { CreateChapterModal } from "./CreateChapterModal";

import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { FolderOpen } from "lucide-react";

export function CourseChaptersForm({ chapters }: { chapters: Chapter[] | [] }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const { courseId } = useParams();

  const router = useRouter();

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/chapters/${courseId}/reorder`, {
        list: updateData,
      });

      toast.success("Capítulos reordenados");
      // router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/tutor/courses/${courseId}/chapters/${id}`);
  };

  return (
    <>
      <CardContent className="relative">
        {isUpdating && (
          <section className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Spinner size="lg" />
          </section>
        )}
        <CardTitle className="flex justify-between gap-3 text-lg mb-3">
          Capítulos del curso
        </CardTitle>

        <CardDescription>
          El primer paso para darle vida a tu curso es definir los capítulos,
          diseñar las clases y crear ejercicios prácticos que refuercen el
          aprendizaje.
        </CardDescription>

        <section className="my-6 italic">
          {chapters.length === 0 && (
            <article className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Sin capítulos
              </p>
            </article>
          )}
          <CourseChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={chapters}
          />
        </section>

        <CardDescription>
          Arrastre y suelte para reordenar los capítulos
        </CardDescription>

        {/** Create Chapter */}
        <CreateChapterModal />
      </CardContent>
    </>
  );
}
