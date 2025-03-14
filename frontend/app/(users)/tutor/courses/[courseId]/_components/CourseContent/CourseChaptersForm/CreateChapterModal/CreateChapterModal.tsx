"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";

import { Button } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
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
import { Plus } from "lucide-react";

export function CreateChapterModal() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "" },
  });

  const createMutation = useMutation({
    mutationFn: (chapter: { title: string }) =>
      axios.post(`/api/chapters/course/${courseId}`, chapter),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        setOpen(false);
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
    createMutation.mutate({ title: data.title });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <section className="w-full flex justify-end">
            <Button>
              <Plus className="w-5 h-5" />
            </Button>
          </section>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear capítulo</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-12 flex-col mt-5"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título del capítulo</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="p.ej. 'Introducción al curso'"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      Define el título de tu capítulo de manera clara y concisa,
                      asegurando que transmita los objetivos del mismo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <section className="flex justify-end">
                <LoadingButton
                  isLoading={createMutation.isPending}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  label="Crear"
                />
              </section>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
