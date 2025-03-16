"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { QuizQuestion } from "@/types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ConfirmModal } from "@/components/modals/confirm-modal";

import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { Trash } from "lucide-react";

export function QuizQuestionHeader({
  quizQuestion,
  index,
}: {
  quizQuestion: QuizQuestion;
  index: number;
}) {
  const queryClient = useQueryClient();
  const { quizId, lessonId } = useParams();

  const mutation = useMutation({
    mutationFn: () => axios.delete(`/api/quiz-questions/${quizQuestion.id}`),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["get_quiz", quizId, lessonId],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Pregunta no encontrada",
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

  async function onDelete() {
    mutation.mutate();
  }

  return (
    <>
      <section className="flex justify-between items-center">
        <Badge>N° {index}</Badge>
        <ConfirmModal onConfirm={onDelete}>
          <Button size="sm" variant="outline" disabled={mutation.isPending}>
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal>
      </section>
    </>
  );
}
