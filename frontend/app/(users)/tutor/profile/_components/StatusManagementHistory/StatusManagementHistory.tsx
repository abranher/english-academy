"use client";

import { useState } from "react";
import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ChevronsDown, ChevronsUp, History } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { TutorStatusHistoryCard } from "./TutorStatusHistoryCard";

export function StatusManagementHistory({
  tutorStatusHistory,
  userId,
}: {
  tutorStatusHistory: TutorStatusHistory[] | [];
  userId: string;
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
                tutorStatusHistory.map((history: TutorStatusHistory) => (
                  <TutorStatusHistoryCard
                    key={history.id}
                    history={history}
                    userId={userId}
                  />
                ))
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
        </CardContent>
      </Card>
    </>
  );
}
