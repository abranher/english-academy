"use client";

import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";
import { formatDateNormal } from "@/libs/date";
import { truncateString } from "@/libs/format";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { StatusBadge } from "@/components/tutors/StatusBadge";
import { Button } from "@/components/shadcn/ui/button";
import {
  CalendarDays,
  CircleAlert,
  CircleCheck,
  NotebookPen,
  UserPen,
} from "lucide-react";
import { ShowHistoryModal } from "./ShowHistoryModal";
import { Badge } from "@/components/shadcn/ui/badge";

export function TutorStatusHistoryCard({
  history,
}: {
  history: TutorStatusHistory;
}) {
  return (
    <>
      <section className="flex flex-col gap-3 rounded-lg border p-4 dark:border-zinc-700">
        <section className="flex justify-between">
          <CardTitle>Detalle</CardTitle>

          <section className="flex items-center gap-3">
            {history.resubmittedAt === null ? (
              <Badge variant="secondary" className="flex gap-1 items-center">
                <CircleAlert className="w-4" />
                En espera
              </Badge>
            ) : (
              <Badge className="flex gap-1 items-center">
                <CircleCheck className="w-4" />
                Realizado
              </Badge>
            )}

            <ShowHistoryModal history={history} />
          </section>
        </section>
        <div className="flex justify-between gap-3">
          <article className="flex flex-col gap-1">
            <CardTitle className="flex gap-1 items-center text-lg">
              <NotebookPen className="w-4" />
              Comentario:
            </CardTitle>
            <CardDescription>{truncateString(history.comment)}</CardDescription>
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
              Cambio de status:
            </CardTitle>
            <CardDescription>
              {formatDateNormal(history.createdAt)}
            </CardDescription>
          </article>
        </div>
      </section>
    </>
  );
}
