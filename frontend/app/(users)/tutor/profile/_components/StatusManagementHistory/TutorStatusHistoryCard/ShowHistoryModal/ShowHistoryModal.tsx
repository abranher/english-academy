"use client";

import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";
import { formatDate } from "@/libs/date";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { CalendarDays, Eye, NotebookPen, UserPen } from "lucide-react";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { StatusBadge } from "@/components/tutors/StatusBadge";

export function ShowHistoryModal({ history }: { history: TutorStatusHistory }) {
  return (
    <>
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
              <CardDescription>{history.comment}</CardDescription>
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
              <CardDescription>{formatDate(history.createdAt)}</CardDescription>
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
    </>
  );
}
