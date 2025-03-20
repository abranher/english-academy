"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormSchema } from "./FormSchema";

import { LoadingButton } from "@/components/common/LoadingButton";

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
import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";

export function CreateMobilePaymentModal() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { courseId, chapterId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { title: "" },
  });

  const createMutation = useMutation({
    mutationFn: (lesson: { title: string }) =>
      axios.post(`/api/lessons/chapter`, lesson),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        form.reset();
        // queryClient.invalidateQueries({
        //   queryKey: ["get_chapter", courseId, chapterId],
        // });
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
    createMutation.mutate({ title: data.title });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <section className="w-full flex justify-end">
          <Button>Agregar</Button>
        </section>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agrega los datos de tu Pago Móvil</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      Define el título de tu lección de manera clara y concisa.
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
  );
}
