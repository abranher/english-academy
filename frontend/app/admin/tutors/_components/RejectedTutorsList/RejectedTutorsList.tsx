"use client";

import Link from "next/link";

import { assetImg } from "@/libs/asset";
import { TutorStatus } from "@/types/enums";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "@nextui-org/react";
import { getByStatusTutors } from "../../_services";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { ArrowUpRight } from "lucide-react";

export function RejectedTutorsList() {
  const {
    data: tutors,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tutors-admin-list", TutorStatus.REJECTED],
    queryFn: () => getByStatusTutors(TutorStatus.REJECTED),
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Listado de Tutores Rechazados
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás todos los tutores rechazados en la
            plataforma.
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex w-full flex-wrap gap-3">
        {isPending ? (
          [1, 2, 3].map((_, i) => (
            <Skeleton key={i} className="w-44 rounded-xl" />
          ))
        ) : tutors && tutors.length > 0 ? ( // Check if tutors exist and have data
          tutors.map((userTutor: any) => (
            <Card key={userTutor.id}>
              <CardHeader className="flex flex-row items-center space-x-4 p-6">
                <section className="w-full flex flex-col items-center justify-center gap-3">
                  <article className="w-full flex justify-center items-center">
                    <Avatar
                      isBordered
                      className="w-24 h-24"
                      color="default"
                      src={
                        assetImg(userTutor.avatarUrl) ||
                        "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      }
                    />
                  </article>
                  <div className="w-full flex flex-col justify-center items-center">
                    <CardTitle className="text-lg font-semibold">
                      {userTutor.name || "Nombre no disponible"}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      @{userTutor.username}
                    </CardDescription>
                  </div>
                </section>
              </CardHeader>
              <CardFooter className="flex justify-end px-6">
                <Link href={`/admin/tutors/${userTutor.id}`}>
                  <Button className="flex gap-3">
                    Ver más
                    <ArrowUpRight className="opacity-90 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center text-zinc-700 dark:text-zinc-200 py-4">
            No hay tutores rechazados actualmente.
          </div>
        )}
      </div>
    </>
  );
}
