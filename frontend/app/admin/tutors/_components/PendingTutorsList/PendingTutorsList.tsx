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
import { Avatar } from "@nextui-org/react";

export function PendingTutorsList() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Solicitudes de Nuevos Tutores
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás todas las solicitudes de nuevos tutores
            que desean unirse a nuestra plataforma.
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            <Card>
              <CardHeader className="flex flex-row items-center space-x-4 p-6">
                <section className="w-full flex flex-col items-center justify-center gap-3">
                  <article className="w-full flex justify-center items-center">
                    <Avatar
                      isBordered
                      className="w-40 h-40"
                      color="default"
                      src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
                    />
                  </article>
                  <div className="w-full flex flex-col justify-center items-center">
                    <CardTitle className="text-lg font-semibold">
                      John Doe
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                      @johndoe
                    </CardDescription>
                  </div>
                </section>
              </CardHeader>
              <CardFooter className="flex justify-end px-6">
                <Button>Ver más información</Button>
              </CardFooter>
            </Card>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
}
