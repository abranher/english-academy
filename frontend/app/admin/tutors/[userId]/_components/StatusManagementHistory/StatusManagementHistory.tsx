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
import { ChevronsDown, ChevronsUp, CircleCheck, History } from "lucide-react";
import { TutorStatusHistoryCard } from "./TutorStatusHistoryCard";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { useState } from "react";
import { User } from "@/types/models/User";
import { TutorStatus } from "@/types/enums";

export function StatusManagementHistory({
  tutorStatusHistory,
  userTutor,
}: {
  tutorStatusHistory: TutorStatusHistory[] | [];
  userTutor: User;
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
                          userTutor={userTutor}
                        />
                      ))
                    : tutorStatusHistory
                        .slice(0, 2)
                        .map((history: TutorStatusHistory) => (
                          <TutorStatusHistoryCard
                            key={history.id}
                            history={history}
                            userTutor={userTutor}
                          />
                        ))}
                </>
              )}
            </article>
            <article className="flex justify-center">
              {tutorStatusHistory.length > 2 && (
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
            {userTutor.tutor?.status === TutorStatus.APPROVED ? (
              <Button disabled className="flex gap-1">
                <CircleCheck className="w-4" />
                Aprobado
              </Button>
            ) : (
              <>
                {tutorStatusHistory.length === 0 ||
                tutorStatusHistory[tutorStatusHistory.length - 1]
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
    </>
  );
}
