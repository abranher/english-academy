import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { CourseReviewsList } from "./_components/CourseReviewsList/CourseReviewsList";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";

export default function CourseReviewPage() {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/courses">Cursos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Historial de revisiones</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <CardTitle>Cursos</CardTitle>
        <CardDescription>Listado de cursos</CardDescription>
      </div>

      <div className="w-full">
        <CourseReviewsList />
      </div>
    </>
  );
}
