"use client";

import { useState } from "react";
import axios from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BioFormSchema } from "./BioFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { BookUser, PenLine, Save, X } from "lucide-react";
import Preview from "@/components/shadcn/ui/preview";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import Editor from "@/components/shadcn/ui/editor";
import { Button } from "@/components/shadcn/ui/button";

export function BiographyCard({
  userId,
  bio,
}: {
  userId: string;
  bio: string | null;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof BioFormSchema>>({
    resolver: zodResolver(BioFormSchema),
    defaultValues: {
      bio: bio ?? "",
    },
  });

  // TODO -> Improve the validation of the bio since it receives
  // a formatted string that makes the min detect the format as characters
  const createUserMutation = useMutation({
    mutationFn: (user: { bio: string }) =>
      axios.patch(`/api/tutors/${userId}/user/bio`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["tutor-user-profile"] });
        setIsEditing(false);
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

  async function onSubmit(data: z.infer<typeof BioFormSchema>) {
    createUserMutation.mutate({
      bio: data.bio,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <section className="flex justify-between items-center">
            <CardTitle className="flex gap-3 items-center">
              Biografía
              <BookUser />
            </CardTitle>
            {!isEditing ? (
              <PenLine
                className="w-4 cursor-pointer hover:opacity-80"
                onClick={() => {
                  setIsEditing(true);
                }}
              />
            ) : (
              <X
                className="w-4 cursor-pointer hover:opacity-80"
                onClick={() => {
                  setIsEditing(false);
                }}
              />
            )}
          </section>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <>
              <section className="flex flex-col gap-5">
                {bio ? (
                  <Preview value={bio} />
                ) : (
                  <CardDescription>Sin biografía</CardDescription>
                )}
              </section>
            </>
          ) : (
            <>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Editor {...field} />
                        </FormControl>

                        <FormDescription>
                          Tu biografía es una oportunidad para presentarte y
                          expresar tu pasión por la enseñanza. Es el primer
                          contacto con los estudiantes, donde puedes mostrar tu
                          personalidad, motivaciones y lo que te hace especial
                          como educador.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <section className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={!isValid || isSubmitting}
                      className="flex gap-1"
                    >
                      Actualizar
                      <Save className="w-5" />
                    </Button>
                  </section>
                </form>
              </Form>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
