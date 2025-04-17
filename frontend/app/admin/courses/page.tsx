import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";
import { Roles } from "@/types/enums";

import { CoursesList } from "./_components/CoursesList";

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
import { Separator } from "@/components/shadcn/ui/separator";
import { CreditCard, DollarSign, Users } from "lucide-react";

export default async function CoursesPage() {
  const session = await auth();

  if (!session) redirect("/");
  if (session.user.role !== Roles.ADMIN) redirect("/");

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

      <section>
        <CardTitle>Cursos</CardTitle>
        <CardDescription>Listado de cursos</CardDescription>
      </section>
      <Separator />

      <CoursesList />
    </>
  );
}
