"use client";

import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ChevronsDown, ChevronsUp, History } from "lucide-react";
import { TutorStatusHistoryCard } from "./TutorStatusHistoryCard";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { useState } from "react";

export function StatusManagementHistory({
  tutorStatusHistory,
}: {
  tutorStatusHistory: TutorStatusHistory[] | [];
}) {
  const [showAll, setShowAll] = useState(false);

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
                <>
                  {showAll
                    ? tutorStatusHistory.map((history: TutorStatusHistory) => (
                        <TutorStatusHistoryCard
                          key={history.id}
                          history={history}
                        />
                      ))
                    : tutorStatusHistory
                        .slice(0, 2)
                        .map((history: TutorStatusHistory) => (
                          <TutorStatusHistoryCard
                            key={history.id}
                            history={history}
                          />
                        ))}
                </>
              )}
            </article>
            <article className="flex justify-center">
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
            </article>
          </section>

          <section className="w-full flex justify-end gap-3 pt-3">
            {tutorStatusHistory.length === 0 ||
            tutorStatusHistory[tutorStatusHistory.length - 1].resubmittedAt ? (
              <ChangeStatusModal />
            ) : (
              <Button disabled>En espera</Button>
            )}
          </section>
        </CardContent>
      </Card>
    </>
  );
}
