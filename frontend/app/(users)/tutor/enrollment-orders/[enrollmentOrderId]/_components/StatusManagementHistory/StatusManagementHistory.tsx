"use client";

import { SubscriptionOrder, SubscriptionOrderHistory } from "@/types/models";
import { useState } from "react";

import { StatusHistoryCard } from "./StatusHistoryCard";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ChevronsDown, ChevronsUp, CircleCheck, History } from "lucide-react";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { SubscriptionOrderStatus } from "@/types/enums";

export function StatusManagementHistory({
  subscriptionOrderHistory,
  subscriptionOrder,
}: {
  subscriptionOrderHistory: SubscriptionOrderHistory[] | [];
  subscriptionOrder: SubscriptionOrder;
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
            {subscriptionOrderHistory.length === 0 ? (
              <CardDescription>Aun no hay registros</CardDescription>
            ) : (
              <>
                {showAll
                  ? subscriptionOrderHistory.map((history) => (
                      <StatusHistoryCard key={history.id} history={history} />
                    ))
                  : subscriptionOrderHistory
                      .slice(0, 2)
                      .map((history) => (
                        <StatusHistoryCard key={history.id} history={history} />
                      ))}
              </>
            )}
          </article>
          <article className="flex justify-center">
            {subscriptionOrderHistory.length > 2 && (
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
          {subscriptionOrder.status === SubscriptionOrderStatus.APPROVED ? (
            <Button disabled className="flex gap-1">
              <CircleCheck className="w-4" />
              Aprobado
            </Button>
          ) : (
            <>
              {subscriptionOrderHistory.length === 0 ||
              subscriptionOrderHistory[subscriptionOrderHistory.length - 1]
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
