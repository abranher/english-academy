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

export default async function TutorSubscriptionOrderPage() {
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
            <BreadcrumbLink asChild>
              <Link href="/tutor/enrollment-orders">
                Órdenes de Inscripción
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>Órden de Inscripción</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Order tutorId={session.user.tutor.id} />
    </>
  );
}
