import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { Order } from "./_components/Order";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function EnrollmentOrderPage() {
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
            <BreadcrumbLink asChild>
              <Link href="/student/enrollment-orders">
                Mis Órdenes de Inscripción
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Mi Órden de Inscripción</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Order studentId={session.user.student.id} />
    </>
  );
}
