import Link from "next/link";

import { CourseReviewsList } from "./_components/CourseReviewsList";

import { Separator } from "@/components/shadcn/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";

export default function CourseReviewsPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/courses">Cursos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Historial de revisiones</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex flex-col gap-1">
        <CardTitle>Historial de revisiones</CardTitle>
        <CardDescription>
          Listado del historial de revisiones de este curso
        </CardDescription>
      </section>

      <Separator />

      <CourseReviewsList />
    </>
  );
}
