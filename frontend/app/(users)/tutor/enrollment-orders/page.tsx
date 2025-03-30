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

export default async function TutorEnrollmentOrdersPage() {
  const session = await auth();
  if (!session) redirect("/");
  if (!session.user.tutor) redirect("/");

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
            <BreadcrumbPage>Órdenes de Inscripción</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <EnrollmentOrders tutorId={session.user.tutor.id} />
    </>
  );
}
