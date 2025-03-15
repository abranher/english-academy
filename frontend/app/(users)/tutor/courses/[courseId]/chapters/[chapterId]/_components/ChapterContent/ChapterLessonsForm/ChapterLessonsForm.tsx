"use client";

import { useRouter } from "next/navigation";

import axios from "@/config/axios";
import { useState } from "react";

import { ChapterLessonsList } from "./ChapterLessonsList";
import { CreateLessonModal } from "./CreateLessonModal";

import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/libs/shadcn/utils";
import { Chapter } from "@/types/models/Chapter";
import { FolderOpen, Plus } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import { Lesson } from "@/types/models/Lesson";

interface LessonsFormProps {
  initialData: Chapter & { lessons: Lesson[] };
  chapterId: string;
}

export function ChapterLessonsForm({
  initialData,
  chapterId,
}: LessonsFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/lessons/${chapterId}/reorder`, {
        list: updateData,
      });

      toast.success("Lecciones reordenados");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <CardContent className="relative">
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
        <CardTitle className="flex justify-between gap-3 text-lg mb-3">
          Lecciones del capítulo
        </CardTitle>

        <CardDescription>
          Es hora de diseñar las clases y crear ejercicios prácticos que
          refuercen el aprendizaje.
        </CardDescription>

        <div
          className={cn(
            "text-sm my-6 w-full",
            !initialData.lessons.length && "text-slate-500 italic"
          )}
        >
          {!initialData.lessons.length && (
            <div className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Sin lecciones
              </p>
            </div>
          )}
          <ChapterLessonsList
            onReorder={onReorder}
            items={initialData.lessons || []}
          />
        </div>

        <p className="text-xs text-muted-foreground my-4">
          Arrastre y suelte para reordenar las lecciones
        </p>

        <CreateLessonModal />
      </CardContent>
    </>
  );
}
