"use client";

import { useParams, useRouter } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { cn } from "@/libs/shadcn/utils";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter } from "@/types/models";

import { CourseChaptersList } from "./CourseChaptersList";
import { FormSchema } from "./FormSchema";

import { Button } from "@/components/shadcn/ui/button";
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { FolderOpen, Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoadingButton } from "@/components/common/LoadingButton";

export function CourseChaptersForm({ chapters }: { chapters: Chapter[] | [] }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "" },
  });

  const createMutation = useMutation({
    mutationFn: (course: { title: string }) =>
      axios.patch(`/api/chapters/${courseId}`, course),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Capítulo creado!");
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
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Spinner size="lg" />
          </div>
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

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <section className="w-full flex justify-end">
              <Button className="flex gap-1">
                <Plus className="w-4 h-4" />
                Añadir
              </Button>
            </section>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear capítulo</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 pt-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex gap-12 flex-col"
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
                          Define el título de tu capítulo de manera clara y
                          concisa, asegurando que transmita los objetivos del
                          mismo.
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
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
}
