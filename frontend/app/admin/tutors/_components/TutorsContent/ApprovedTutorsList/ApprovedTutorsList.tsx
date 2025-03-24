"use client";

import { User } from "@/types/models";
import { useQuery } from "@tanstack/react-query";
import { TutorStatus } from "@/types/enums";
import { getByStatusTutors } from "../../../_services";

import { MiniTutorCard } from "../../MiniTutorCard";

import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { FolderOpen } from "lucide-react";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

export function ApprovedTutorsList() {
  const {
    data: tutors,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tutors-admin-list", TutorStatus.APPROVED],
    queryFn: () => getByStatusTutors(TutorStatus.APPROVED),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <CardHeader>
        <CardTitle>Listado de Tutores Aprobados</CardTitle>
        <CardDescription>
          En esta sección encontrarás todos los tutores aprobados en la
          plataforma.
        </CardDescription>
      </CardHeader>

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
              No hay tutores aprobados actualmente.
            </h2>
          </section>
        )}
      </div>
    </>
  );
}
