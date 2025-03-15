"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";

import { CardContent } from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";

export function ClassTitleForm({ title }: { title: string }) {
  const queryClient = useQueryClient();
  const { lessonId, classId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title },
  });

  const mutation = useMutation({
    mutationFn: (lessonClass: { title: string }) =>
      axios.patch(`/api/classes/${classId}/lesson/${lessonId}`, lessonClass),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Título actualizado!");
        queryClient.invalidateQueries({
          queryKey: ["get_class", classId, lessonId],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Lección no encontrada",
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
    mutation.mutate({ title: data.title });
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título de la clase</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej. 'Conversación en Inglés Fluido'"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    Define el título que mejor represente el contenido de la
                    clase.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <section className="flex items-center gap-x-2">
              <LoadingButton
                isLoading={mutation.isPending}
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Guardar"
              />
            </section>
          </form>
        </Form>
      </CardContent>
    </>
  );
}
