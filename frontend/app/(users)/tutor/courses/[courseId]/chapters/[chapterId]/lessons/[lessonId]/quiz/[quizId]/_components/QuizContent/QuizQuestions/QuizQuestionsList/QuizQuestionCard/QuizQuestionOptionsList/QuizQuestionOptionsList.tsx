"use client";

import { LoadingButton } from "@/components/common/LoadingButton";
import { CardTitle } from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";
import { FormSchema } from "../../../CreateQuestionModal/FormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { QuizQuestion } from "@/types/models";
import { CreateOptionModal } from "./CreateOptionModal";

export function QuizQuestionOptionsList({
  quizQuestion,
}: {
  quizQuestion: QuizQuestion;
}) {
  const queryClient = useQueryClient();
  const { quizId, lessonId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { question: quizQuestion.question },
  });

  const createMutation = useMutation({
    mutationFn: (QuizQuestion: { question: string }) =>
      axios.patch(
        `/api/quiz-questions/${quizQuestion.id}/quiz/${quizId}`,
        QuizQuestion
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Pregunta actualizada!");
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
          404: "Quiz no encontrado",
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createMutation.mutate({ question: data.question });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section>
        <CardTitle className="text-base">Opciones:</CardTitle>

        <article>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-4 mt-3"
            >
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="p.ej. 'Como se traduce...'"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                isLoading={createMutation.isPending}
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Actualizar"
              />
            </form>
          </Form>
        </article>

        <CreateOptionModal quizQuestionId={quizQuestion.id} />
      </section>
    </>
  );
}
