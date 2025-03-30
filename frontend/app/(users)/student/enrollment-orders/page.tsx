import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { EnrollmentOrders } from "./_components/EnrollmentOrders";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function EnrollmentOrdersPage() {
  const session = await auth();
  if (!session) redirect("/");
  if (!session.user.student) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/student/home">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mis Órdenes de Inscripción</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EnrollmentOrders studentId={session.user.student.id} />
    </>
  );
}
