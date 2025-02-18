"use client";

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
import Link from "next/link";

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

      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {isPending ? (
              Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-[300px] w-[250px] rounded-xl"
                  />
                ))
            ) : tutors && tutors.length > 0 ? (
              tutors.map((userTutor: any) => (
                <Card key={userTutor.id}>
                  <CardHeader className="flex flex-row items-center space-x-4 p-6">
                    <section className="w-full flex flex-col items-center justify-center gap-3">
                      <article className="w-full flex justify-center items-center">
                        <Avatar
                          isBordered
                          className="w-40 h-40"
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
                      <Button>Ver más información</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="text-center text-zinc-700 dark:text-zinc-200 py-4">
                No hay registrados actualmente.
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
