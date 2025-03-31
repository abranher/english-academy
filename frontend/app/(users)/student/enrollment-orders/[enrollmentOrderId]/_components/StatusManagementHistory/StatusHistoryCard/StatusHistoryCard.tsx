"use client";

import { truncateString } from "@/libs/format";
import { formatDateNormal } from "@/libs/date";
import { EnrollmentOrderStatusDecision } from "@/types/enums";
import { EnrollmentOrder, EnrollmentOrderHistory } from "@/types/models";

import { OrderStatusBadge } from "@/components/enrollment-orders";
import { ResubmittedAction } from "./ResubmittedAction";
import { ShowHistoryModal } from "./ShowHistoryModal";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { CalendarDays, CircleCheck, NotebookPen, UserPen } from "lucide-react";
import { Badge } from "@/components/shadcn/ui/badge";

export function StatusHistoryCard({
  history,
  enrollmentOrder,
  studentId,
}: {
  history: EnrollmentOrderHistory;
  enrollmentOrder: EnrollmentOrder;
  studentId: string;
}) {
  return (
    <>
      <section className="flex flex-col gap-3 rounded-lg border p-4 dark:border-zinc-700">
        <section className="flex justify-between">
          <CardTitle>Detalle</CardTitle>

          <section className="flex items-center gap-3">
            {history.decision === EnrollmentOrderStatusDecision.APPROVED && (
              <Badge className="flex gap-1 items-center">
                <CircleCheck className="w-4" />
                Aprobado
              </Badge>
            )}
            {history.decision ===
              EnrollmentOrderStatusDecision.NEEDS_CHANGES && (
              <>
                {history.resubmittedAt === null ? (
                  <ResubmittedAction
                    history={history}
                    enrollmentOrder={enrollmentOrder}
                    studentId={studentId}
                  />
                ) : (
                  <Badge
                    variant="secondary"
                    className="flex gap-1 items-center"
                  >
                    <CircleCheck className="w-4" />
                    Realizado
                  </Badge>
                )}
              </>
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
              <OrderStatusBadge status={history.previousStatus} />
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
