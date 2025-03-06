"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

import { History } from "lucide-react";
import { TutorStatusHistory } from "@/types/models/TutorStatusHistory";

import { TutorStatusHistoryCard } from "./TutorStatusHistoryCard";

export function StatusManagementHistory({
  tutorStatusHistory,
  userId,
}: {
  tutorStatusHistory: TutorStatusHistory[] | [];
  userId: string;
}) {
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
          </section>
        </CardContent>
      </Card>
    </>
  );
}
