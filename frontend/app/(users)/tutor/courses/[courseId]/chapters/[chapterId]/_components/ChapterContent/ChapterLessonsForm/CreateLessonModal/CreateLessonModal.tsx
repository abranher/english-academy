"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { LessonType } from "@/types/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";

import { Button } from "@/components/shadcn/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { Label } from "@/components/shadcn/ui/label";
import { ClipboardList, FileVideo, Plus } from "lucide-react";

export function CreateLessonModal() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { courseId, chapterId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "" },
  });

  const createMutation = useMutation({
    mutationFn: (lesson: { title: string; type: LessonType }) =>
      axios.post(`/api/lessons/chapter/${chapterId}`, lesson),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        setOpen(false);
        form.reset();
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createMutation.mutate({ title: data.title, type: data.type });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <section className="w-full flex justify-end">
            <Button>
              <Plus />
            </Button>
          </section>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear lección</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/** Lesson type */}
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Tipo de lección</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <section className="w-full">
                                <RadioGroupItem
                                  value={LessonType.CLASS}
                                  id={LessonType.CLASS}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={LessonType.CLASS}
                                  className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <FileVideo className="mb-3 h-6 w-6" />
                                  <span className="whitespace-nowrap">
                                    Clase
                                  </span>
                                </Label>
                              </section>
                            </FormControl>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <section className="w-full">
                                <RadioGroupItem
                                  value={LessonType.QUIZ}
                                  id={LessonType.QUIZ}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={LessonType.QUIZ}
                                  className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                >
                                  <ClipboardList className="mb-3 h-6 w-6" />
                                  <span className="whitespace-nowrap">
                                    Quiz
                                  </span>
                                </Label>
                              </section>
                            </FormControl>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/** Lesson title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Título de la lección</FormLabel>

                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="p.ej. 'Introducción al curso'"
                          {...field}
                        />
                      </FormControl>

                      <FormDescription>
                        Define el título de tu lección de manera clara y
                        concisa.
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
    </>
  );
}
