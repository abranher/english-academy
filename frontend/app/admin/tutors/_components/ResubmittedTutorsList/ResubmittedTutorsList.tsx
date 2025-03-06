"use client";

import { useQuery } from "@tanstack/react-query";
import { TutorStatus } from "@/types/enums";
import { getByStatusTutors } from "../../_services/get-by-status-tutors";
import { User } from "@/types/models/User";

import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { FolderOpen } from "lucide-react";
import { MiniTutorCard } from "../MiniTutorCard";

export function ResubmittedTutorsList() {
  const {
    data: tutors,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tutors-admin-list", TutorStatus.RESUBMITTED],
    queryFn: () => getByStatusTutors(TutorStatus.RESUBMITTED),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Listado de Tutores Reenviados
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás los tutores que han reenviado su perfil.
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex w-full flex-wrap gap-3">
        {isPending ? (
          [1, 2, 3].map((_, i) => (
            <Skeleton key={i} className="w-44 rounded-xl" />
          ))
        ) : tutors && tutors.length > 0 ? (
          tutors.map((userTutor: User) => (
            <MiniTutorCard key={userTutor.id} user={userTutor} />
          ))
        ) : (
          <section className="w-full text-zinc-700 dark:text-zinc-200 py-4">
            <h2 className="flex justify-center flex-col items-center">
              <FolderOpen className="w-24 h-24" />
              No hay nuevos tutores actualmente.
            </h2>
          </section>
        )}
      </div>
    </>
  );
}
