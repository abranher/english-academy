import Link from "next/link";

import { validateTutorSession } from "@/libs/middleware/authValidation";

import { CoursesList } from "./_components/CoursesList";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { CreditCard, DollarSign, Users } from "lucide-react";

export default async function TutorCoursesPage() {
  const session = await validateTutorSession();

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
            <BreadcrumbPage>Cursos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className="flex flex-col gap-1">
        <CardTitle>Tus cursos</CardTitle>
        <CardDescription>Listado de todos tus cursos.</CardDescription>
      </section>

      <Separator />

      <CoursesList userId={session.user.id} />
    </>
  );
}
