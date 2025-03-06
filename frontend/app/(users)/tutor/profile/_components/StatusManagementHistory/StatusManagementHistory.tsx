"use client";

import { useState } from "react";

import axios from "@/config/axios";
import { AxiosError } from "axios";
import { formatDate, formatDateNormal } from "@/libs/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { truncateString } from "@/libs/format";

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

import {
  CalendarDays,
  CircleCheck,
  Eye,
  History,
  Loader2,
  NotebookPen,
  Send,
  UserPen,
} from "lucide-react";
import { StatusBadge } from "@/components/tutors/StatusBadge";
import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";

export function StatusManagementHistory({
  tutorStatusHistory,
  userId,
}: {
  tutorStatusHistory: TutorStatusHistory[] | [];
  userId: string;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const createMutation = useMutation({
    mutationFn: (historyId: string) =>
      axios.post(
        `/api/tutor-status-history/${historyId}/user/${userId}/resubmitted`
      ),
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
                    className="flex flex-col gap-3 rounded-lg border p-4 dark:border-zinc-700"
                  >
                    <section className="flex justify-between">
                      <CardTitle>Detalle</CardTitle>

                      <section className="flex items-center gap-3">
                        {history.resubmittedAt === null ? (
                          <>
                            <AlertDialog open={open} onOpenChange={setOpen}>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="flex gap-2 items-center"
                                >
                                  <Send className="w-4" />
                                  Reenviar
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estas seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  {!createMutation.isPending ? (
                                    <Button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        createMutation.mutate(history.id);
                                      }}
                                    >
                                      Confirmar
                                    </Button>
                                  ) : (
                                    <Button disabled>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                      Espere por favor...
                                    </Button>
                                  )}
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="outline"
                              type="button"
                              disabled
                              className="flex gap-2 items-center"
                            >
                              <CircleCheck className="w-4" />
                              Reenviado
                            </Button>
                          </>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Eye className="w-4" />
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
                                  <StatusBadge
                                    status={history.previousStatus}
                                  />
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
                    <div className="flex justify-around gap-3">
                      <article className="flex flex-col gap-1">
                        <CardTitle className="flex gap-1 items-center text-lg">
                          <NotebookPen className="w-4" />
                          Comentario:
                        </CardTitle>
                        <CardDescription>
                          {truncateString(history.comment)}
                        </CardDescription>
                      </article>

                      <article className="flex flex-col gap-1">
                        <CardTitle className="flex gap-1 items-center text-lg">
                          <UserPen className="w-4" />
                          Status previo:
                        </CardTitle>
                        <div className="flex justify-center">
                          <StatusBadge status={history.previousStatus} />
                        </div>
                      </article>

                      <article className="flex flex-col gap-1">
                        <CardTitle className="flex gap-1 items-center text-lg">
                          <CalendarDays className="w-4" />
                          Fecha:
                        </CardTitle>
                        <CardDescription>
                          {formatDateNormal(history.createdAt)}
                        </CardDescription>
                      </article>
                    </div>
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
