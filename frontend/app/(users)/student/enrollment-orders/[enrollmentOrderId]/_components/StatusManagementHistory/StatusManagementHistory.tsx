"use client";

import { useState } from "react";
import { EnrollmentOrder, EnrollmentOrderHistory } from "@/types/models";

import { StatusHistoryCard } from "./StatusHistoryCard";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ChevronsDown, ChevronsUp, History } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";

const MIN = 0;
const MAX = 2;

export function StatusManagementHistory({
  studentId,
  enrollmentOrderHistory,
}: {
  studentId: string;
  enrollmentOrderHistory: EnrollmentOrderHistory[] | [];
}) {
  const [showAll, setShowAll] = useState(false);

  return (
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
            {enrollmentOrderHistory.length === 0 ? (
              <CardDescription>Aun no hay registros</CardDescription>
            ) : (
              <>
                {showAll
                  ? enrollmentOrderHistory.map((history) => (
                      <StatusHistoryCard
                        key={history.id}
                        history={history}
                        studentId={studentId}
                      />
                    ))
                  : enrollmentOrderHistory
                      .slice(MIN, MAX)
                      .map((history) => (
                        <StatusHistoryCard
                          key={history.id}
                          history={history}
                          studentId={studentId}
                        />
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
      </CardContent>
    </Card>
  );
}
