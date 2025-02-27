"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";
import { Separator } from "@/components/shadcn/ui/separator";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { assetImg } from "@/libs/asset";
import { Avatar } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getAllTutors } from "../../_services";
import { ArrowUpRight, FolderOpen } from "lucide-react";
import { StatusBadge } from "@/components/tutors/StatusBadge";

export function AllTutorsList() {
  const {
    data: tutors,
    isPending,
    error,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: getAllTutors,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Listado de Tutores
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás todos los tutores registrados en la
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
        ) : tutors && tutors.length > 0 ? (
          tutors.map((userTutor: any) => (
            <Card key={userTutor.id}>
              <CardHeader className="flex flex-row items-center p-4">
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
              <CardFooter className="flex flex-col gap-3 px-6">
                <StatusBadge status={userTutor.tutor.status} />
                <Link href={`/admin/tutors/${userTutor.id}`}>
                  <Button className="flex gap-3">
                    Ver mas
                    <ArrowUpRight className="opacity-90 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <section className="w-full text-zinc-700 dark:text-zinc-200 py-4">
            <h2 className="flex justify-center flex-col items-center">
              <FolderOpen className="w-24 h-24" />
              No hay registrados actualmente.
            </h2>
          </section>
        )}
      </div>
    </>
  );
}
