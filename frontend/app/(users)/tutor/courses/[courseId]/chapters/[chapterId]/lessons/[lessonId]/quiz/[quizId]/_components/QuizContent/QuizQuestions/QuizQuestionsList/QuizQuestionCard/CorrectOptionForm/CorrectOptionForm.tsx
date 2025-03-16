"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizQuestion } from "@/types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";

import { CardTitle } from "@/components/shadcn/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Separator } from "@/components/shadcn/ui/separator";

export function CorrectOptionForm({
  quizQuestion,
}: {
  quizQuestion: QuizQuestion;
}) {
  const queryClient = useQueryClient();
  const { quizId, lessonId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      optionId: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (quizQuestionOption: { optionId: string }) =>
      axios.patch(
        `/api/quiz-question-options/quiz-question/${quizQuestion.id}`,
        quizQuestionOption
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Opción correcta actualizada!");
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
    mutation.mutate({ optionId: data.optionId });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      {quizQuestion.options.length !== 0 && (
        <>
          <Separator />

          <section>
            <CardTitle className="text-base">Opción correcta:</CardTitle>

            <section className="my-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 mt-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="optionId"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Elige una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Opciones</SelectLabel>
                              {quizQuestion.options.map((option) => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.option}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center gap-x-2">
                    <LoadingButton
                      isLoading={mutation.isPending}
                      isValid={isValid}
                      isSubmitting={isSubmitting}
                      label="Guardar"
                    />
                  </div>
                </form>
              </Form>
            </section>
          </section>
        </>
      )}
    </>
  );
}
