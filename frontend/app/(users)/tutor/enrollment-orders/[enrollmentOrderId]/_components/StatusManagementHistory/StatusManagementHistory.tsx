"use client";

import { useState } from "react";
import { EnrollmentOrderStatus } from "@/types/enums";
import { EnrollmentOrder, EnrollmentOrderHistory } from "@/types/models";

import { StatusHistoryCard } from "./StatusHistoryCard";
import { ChangeStatusModal } from "./ChangeStatusModal";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ChevronsDown, ChevronsUp, CircleCheck, History } from "lucide-react";

export function StatusManagementHistory({
  enrollmentOrderHistory,
  enrollmentOrder,
}: {
  enrollmentOrderHistory: EnrollmentOrderHistory[] | [];
  enrollmentOrder: EnrollmentOrder;
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-3 items-center">
          Historial de Status
          <History />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <section className="flex flex-col gap-5">
          <article className="flex flex-col gap-3">
            {enrollmentOrderHistory.length === 0 ? (
              <CardDescription>Aun no hay registros</CardDescription>
            ) : (
              <>
                {showAll
                  ? enrollmentOrderHistory.map((history) => (
                      <StatusHistoryCard key={history.id} history={history} />
                    ))
                  : enrollmentOrderHistory
                      .slice(0, 2)
                      .map((history) => (
                        <StatusHistoryCard key={history.id} history={history} />
                      ))}
              </>
            )}
          </article>
          <article className="flex justify-center">
            {enrollmentOrderHistory.length > 2 && (
              <>
                {showAll ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    type="button"
                    onClick={() => {
                      setShowAll(false);
                    }}
                  >
                    <ChevronsUp className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    type="button"
                    onClick={() => {
                      setShowAll(true);
                    }}
                  >
                    <ChevronsDown className="w-5 h-5" />
                  </Button>
                )}
              </>
            )}
          </article>
        </section>

        <section className="w-full flex justify-end gap-3 pt-3">
          {enrollmentOrder.status === EnrollmentOrderStatus.APPROVED ? (
            <Button disabled className="flex gap-1">
              <CircleCheck className="w-4" />
              Aprobado
            </Button>
          ) : (
            <>
              {enrollmentOrderHistory.length === 0 ||
              enrollmentOrderHistory[enrollmentOrderHistory.length - 1]
                .resubmittedAt ? (
                <ChangeStatusModal />
              ) : (
                <Button disabled>En espera</Button>
              )}
            </>
          )}
        </section>
      </CardContent>
    </Card>
  );
}
