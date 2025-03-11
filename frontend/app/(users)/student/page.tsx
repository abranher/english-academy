"use client";

import { Separator } from "@/components/shadcn/ui/separator";
import { Card, CardTitle } from "@/components/shadcn/ui/card";
import { Avatar } from "@heroui/react";
import BadgeLevel from "./_components/BadgeLevel";
import FlagIcon from "@/components/common/FlagIcon";
import { Button } from "@/components/shadcn/ui/button";
import { BookmarkCheck, BookOpen, Clock, Medal, Pencil } from "lucide-react";
import Box from "@/components/common/Box";
import { useSession } from "next-auth/react";
import PurchasesCoursesList from "./_components/PurchasesCoursesList";
import PurchasesCoursesSkeleton from "./_components/PurchasesCoursesSkeleton";

export default function StudentHomePage() {
  const { data: session, status } = useSession();

  const studentId = session?.user.student?.id;

  return (
    <>
      {status === "loading" ? (
        <>
          <PurchasesCoursesSkeleton />
        </>
      ) : (
        <Box>
          <div className="space-y-6 p-6">
            {/* Contenedor con grilla ajustada */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-3 px-24">
                  <Card x-chunk="dashboard-01-chunk-0">
                    <div className="flex flex-col gap-2 items-center py-4">
                      <BookmarkCheck className="h-9 w-9 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">
                        Cursos finalizados
                      </CardTitle>
                      <div className="text-3xl font-bold">3</div>
                    </div>
                  </Card>
                  <Card x-chunk="dashboard-01-chunk-1">
                    <div className="flex flex-col gap-2 items-center py-4">
                      <Medal className="h-9 w-9 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">
                        Puntuación
                      </CardTitle>
                      <div className="text-3xl font-bold">+2350</div>
                    </div>
                  </Card>
                  <Card x-chunk="dashboard-01-chunk-2">
                    <div className="flex flex-col gap-2 items-center py-4">
                      <Clock className="h-9 w-9 text-muted-foreground" />
                      <CardTitle className="text-sm font-medium">
                        Horas estudiadas
                      </CardTitle>

                      <div className="text-3xl font-bold">12,23</div>
                    </div>
                  </Card>
                </div>

                <h2 className="text-2xl mt-5 font-bold tracking-tight flex gap-3 items-center">
                  <BookOpen />
                  Cursos pendientes
                </h2>

                <Separator className="my-4" />

                <PurchasesCoursesList studentId={studentId} />
              </div>

              <div className="h-32 rounded-lg">
                <Card>
                  <section className="flex flex-col items-center gap-3 w-full py-9">
                    <section className="flex flex-col items-center gap-2">
                      <Avatar
                        isBordered
                        radius="full"
                        className="w-24 h-24"
                        src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                      />

                      <section className="flex flex-col items-center">
                        <p className="text-lg font-semibold">
                          Abraham hernandez
                        </p>
                        <p className="font-semibold text-gray-500">@Abraham</p>
                      </section>
                    </section>

                    <article className="flex items-center flex-col gap-1">
                      <FlagIcon />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        De Venezuela
                      </p>
                    </article>

                    <article className="flex items-center flex-col gap-1">
                      <BadgeLevel level={"B2"} />
                      <h4 className="font-semibold">Avanzado</h4>
                    </article>

                    <Button>
                      <Pencil />
                      Editar perfil
                    </Button>
                  </section>
                </Card>
              </div>
            </div>
          </div>
        </Box>
      )}
    </>
  );
}
