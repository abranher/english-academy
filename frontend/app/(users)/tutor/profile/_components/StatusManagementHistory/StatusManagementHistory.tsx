"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import axios from "@/config/axios";
import { z } from "zod";
import { AxiosError } from "axios";
import { formatDate } from "@/libs/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { truncateString } from "@/libs/format";
import { FormSchema } from "./FormSchema";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";

import { CalendarDays, Eye, History, NotebookPen, UserPen } from "lucide-react";
import { StatusBadge } from "@/components/tutors/StatusBadge";
import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";

export function StatusManagementHistory({
  tutorStatusHistory,
}: {
  tutorStatusHistory: TutorStatusHistory[] | [];
}) {
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

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex gap-3 items-center">
            Historial de Status
            <History />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <section className="flex flex-col gap-5">
            <article className="flex flex-col gap-3">
              {tutorStatusHistory.length === 0 ? (
                <CardDescription>Aun no hay registros</CardDescription>
              ) : (
                tutorStatusHistory.map((history: TutorStatusHistory) => (
                  <section
                    key={history.id}
                    className="flex items-center justify-between rounded-lg border p-4 dark:border-zinc-700"
                  >
                    <div className="space-y-2">
                      <h3 className="font-medium flex gap-1 items-center">
                        <NotebookPen className="w-4" />
                        Comentario: {truncateString(history.comment)}
                      </h3>
                      <p className="text-sm flex gap-1 items-center">
                        <CalendarDays className="w-4" />
                        Fecha: {formatDate(history.createdAt)}
                      </p>
                      <p className="text-sm flex gap-1 items-center">
                        <StatusBadge status={history.previousStatus} />
                      </p>
                    </div>

                    <section className="flex gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Eye />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <CardTitle>Detalle</CardTitle>
                          </DialogHeader>
                          <section className="flex flex-col gap-3">
                            <article className="flex flex-col gap-1">
                              <DialogTitle className="flex gap-1 items-center">
                                <NotebookPen className="w-4" />
                                Comentario:
                              </DialogTitle>
                              <CardDescription>
                                {history.comment}
                              </CardDescription>
                            </article>

                            <article className="flex gap-2">
                              <DialogTitle className="flex gap-1 items-center">
                                <UserPen className="w-4" />
                                Status previo:
                              </DialogTitle>
                              <div className="flex">
                                <StatusBadge status={history.previousStatus} />
                              </div>
                            </article>

                            <article className="flex flex-col gap-1">
                              <DialogTitle className="flex gap-1 items-center">
                                <CalendarDays className="w-4" />
                                Fecha:
                              </DialogTitle>
                              <CardDescription>
                                {formatDate(history.createdAt)}
                              </CardDescription>
                            </article>
                          </section>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Cerrar
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </section>
                  </section>
                ))
              )}
            </article>
          </section>
        </CardContent>
      </Card>
    </>
  );
}
