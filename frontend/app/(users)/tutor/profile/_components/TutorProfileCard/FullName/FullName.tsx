"use client";

import axios from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/shadcn/ui/button";
import { CardTitle } from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { PenLine, Save, X } from "lucide-react";

export function FullName({
  userId,
  name,
  lastName,
}: {
  userId: string;
  name: string;
  lastName: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name,
      lastName: lastName,
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (user: { name: string; lastName: string }) =>
      axios.patch(`/api/tutors/${userId}/user/profile`, user),
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createUserMutation.mutate({
      name: data.name,
      lastName: data.lastName,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      {!isEditing ? (
        <>
          <CardTitle className="flex gap-2 items-center">
            <span>{`${name} ${lastName}`}</span>
            <PenLine
              className="w-4 cursor-pointer hover:opacity-80"
              onClick={() => {
                setIsEditing(true);
              }}
            />
          </CardTitle>
        </>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <section className="flex justify-end gap-3">
                <Button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  variant="outline"
                  disabled={!isValid || isSubmitting}
                  className="flex gap-1"
                >
                  Cancelar
                  <X className="w-5" />
                </Button>
              </section>

              <section className="flex gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Luis" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input placeholder="González" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

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
    </>
  );
}
