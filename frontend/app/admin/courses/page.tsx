import Link from "next/link";
import axios from "@/config/axios";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { CoursesPendingReviewList } from "./_components/CoursesPendingReviewList";

export default async function CoursesPage() {
  const { data } = await axios.get("/api/courses");

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
            <BreadcrumbPage>Cursos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <CardTitle>Cursos</CardTitle>
        <CardDescription>Listado de cursos</CardDescription>
      </div>

      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Listado de cursos: PENDIENTE DE REVISIÓN</CardTitle>
            <CardDescription>
              Lista de cursos pendientes de revisión. Aquí puedes ver los cursos
              que necesitan ser revisados y aprobados antes de su publicación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CoursesPendingReviewList />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
