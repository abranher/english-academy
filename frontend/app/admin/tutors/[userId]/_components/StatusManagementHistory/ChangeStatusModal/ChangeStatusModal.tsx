"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import axios from "@/config/axios";
import { z } from "zod";
import { AxiosError } from "axios";
import { TutorStatus } from "@/types/enums/TutorStatus";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FormSchema } from "./FormSchema";

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
import { Button } from "@/components/shadcn/ui/button";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { LoadingButton } from "@/components/common/LoadingButton";

export function ChangeStatusModal() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { userId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const createMutation = useMutation({
    mutationFn: (user: { comment: string; status: string }) =>
      axios.post(`/api/admin/tutor-status-history/user/${userId}`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["tutor-admin-profile"] });
        setOpen(false);
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
    createMutation.mutate({
      comment: data.comment,
      status: data.status,
    });
  }

  const { isValid, isSubmitting } = form.formState;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Gestionar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Gestionar estado de tutor</DialogTitle>
          </DialogHeader>
          <section>
            <Form {...form}>
              <form
                className="flex flex-col gap-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Comentario</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="p.ej: Bienvenido..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Deja un comentario para informar al tutor del por qué de
                        tu decisión.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Estado a cambiar</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={TutorStatus.PENDING} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              PENDIENTE
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={TutorStatus.APPROVED} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              APROBADO
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={TutorStatus.REJECTED} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              RECHAZADO
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <section className="flex w-full justify-end mt-4">
                  <LoadingButton
                    isLoading={createMutation.isPending}
                    isValid={isValid}
                    isSubmitting={isSubmitting}
                  />
                </section>
              </form>
            </Form>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
