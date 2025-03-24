import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { CheckoutContent } from "./_components/CheckoutContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function PlanSubscriptionCheckoutPage() {
  const session = await auth();

  if (!session) redirect("/");
  if (!session.user.tutor) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tutor/plans">Planes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              Confirmación de la Orden de Suscripción
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CheckoutContent
        userId={session.user.id}
        tutorId={session.user.tutor.id}
      />
    </>
  );
}
