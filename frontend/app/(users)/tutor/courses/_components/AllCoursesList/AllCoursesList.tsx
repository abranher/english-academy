"use client";

import { Separator } from "@/components/shadcn/ui/separator";

export function AllCoursesList() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Listado de cursos
          </h2>
          <p className="text-sm text-muted-foreground">
            En esta sección encontrarás todos tu cursos.
          </p>
        </div>
      </div>

      <Separator className="my-4" />
    </>
  );
}
