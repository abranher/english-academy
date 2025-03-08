"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import axios from "@/config/axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./formSchema";
import { z } from "zod";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { LoadingButton } from "@/components/common/LoadingButton";

export function CreateCourse({
  userId,
  tutorId,
}: {
  userId: string;
  tutorId: string;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: { title: string }) =>
      axios.post(`/api/courses/tutor/${tutorId}`, data, {
        headers: {
          "X-User-Id-Audit-Log": `${userId}`,
        },
      }),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        router.push(`/tutor/courses/${response.data.course.id}`);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Usuario no encontrado",
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

  async function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate({ title: data.title });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <div className="w-full flex items-center justify-center h-full p-6">
        <Card className="w-full max-w-5xl">
          <CardHeader>
            <CardTitle>Nuevo Curso</CardTitle>
            <CardDescription>Crea un nuevo curso.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <section className="mb-20">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título del curso</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="Aprendiendo..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </section>
                <div className="flex justify-end gap-3">
                  <Link href="/tutor/courses">
                    <Button variant="outline" type="button">
                      Cancelar
                    </Button>
                  </Link>
                  <LoadingButton
                    isLoading={mutation.isPending}
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                    label={"Crear"}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
