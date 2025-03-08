"use client";

import { Separator } from "@/components/shadcn/ui/separator";

export function DraftCoursesList() {
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
    </>
  );
}
