import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { SubscriptionOrders } from "./_components/SubscriptionOrders";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function SubscriptionOrdersPage() {
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
            <BreadcrumbPage>Mis Órdenes de Suscripción</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <SubscriptionOrders tutorId={session.user.tutor.id} />
    </>
  );
}
