"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";

import { CardContent } from "@/components/shadcn/ui/card";
import Editor from "@/components/shadcn/ui/editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export function CourseLearningObjectivesForm({
  learningObjectives,
}: {
  learningObjectives: string | null;
}) {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      learningObjectives: learningObjectives ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (course: { learningObjectives: string }) =>
      axios.patch(`/api/courses/${courseId}`, course),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Objetivos de aprendizaje actualizados!");
        queryClient.invalidateQueries({ queryKey: ["get_course", courseId] });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Curso no encontrado",
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
    mutation.mutate({ learningObjectives: data.learningObjectives });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="learningObjectives"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Objetivos de Aprendizaje (Por favor, enumera los objetivos
                    en formato de lista)
                  </FormLabel>

                  <FormControl>
                    <Editor {...field} />
                  </FormControl>

                  <FormDescription>
                    Los objetivos de aprendizaje guían el curso y permiten a los
                    estudiantes conocer las habilidades que adquirirán al
                    finalizar.
                  </FormDescription>
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
      </CardContent>
    </>
  );
}
