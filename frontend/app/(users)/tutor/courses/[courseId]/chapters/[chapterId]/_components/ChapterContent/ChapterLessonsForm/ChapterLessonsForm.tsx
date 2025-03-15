"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { toast } from "sonner";
import { Lesson } from "@/types/models";
import { Spinner } from "@heroui/react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ChapterLessonsList } from "./ChapterLessonsList";
import { CreateLessonModal } from "./CreateLessonModal";

import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { FolderOpen } from "lucide-react";

export function ChapterLessonsForm({ lessons }: { lessons: Lesson[] | [] }) {
  const queryClient = useQueryClient();
  const { courseId, chapterId } = useParams();

  const reorderMutation = useMutation({
    mutationFn: (updateData: { id: string; position: number }[]) =>
      axios.put(`/api/lessons/chapter/${chapterId}/reorder`, {
        list: updateData,
      }),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["get_chapter", courseId, chapterId],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Capítulo no encontrado",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  return (
    <>
      <CardContent className="relative">
        {reorderMutation.isPending && (
          <section className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Spinner size="lg" />
          </section>
        )}
        <CardTitle className="flex justify-between gap-3 text-lg mb-3">
          Lecciones del capítulo
        </CardTitle>

        <CardDescription>
          Es hora de diseñar las clases y crear ejercicios prácticos que
          refuercen el aprendizaje.
        </CardDescription>

        <section className="my-6 italic">
          {lessons.length === 0 && (
            <CardDescription className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Sin lecciones
              </p>
            </CardDescription>
          )}

          <ChapterLessonsList
            onReorder={reorderMutation.mutate}
            items={lessons}
          />
        </section>

        <CardDescription>
          Arrastre y suelte para reordenar los lecciones
        </CardDescription>

        <CreateLessonModal />
      </CardContent>
    </>
  );
}
