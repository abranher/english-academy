"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { z } from "zod";
import { FormSchema } from "./FormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { LoadingButton } from "@/components/common/LoadingButton";
import { QuizQuestionOption } from "@/types/models";

export function QuizQuestionOptionForm({
  option,
  quizQuestionId,
}: {
  option: QuizQuestionOption;
  quizQuestionId: string;
}) {
  const queryClient = useQueryClient();
  const { quizId, lessonId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { option: option.option },
  });

  const createMutation = useMutation({
    mutationFn: (QuizQuestionOption: { option: string }) =>
      axios.patch(
        `/api/quiz-question-options/${option.id}/quiz-question/${quizQuestionId}`,
        QuizQuestionOption
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Opción actualizada!");
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createMutation.mutate({ option: data.option });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <article>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 mt-3"
          >
            <FormField
              control={form.control}
              name="option"
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
    </>
  );
}
