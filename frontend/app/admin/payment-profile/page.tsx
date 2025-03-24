import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { PlatformPaymentProfile } from "./_components/PlatformPaymentProfile";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function PlatformPaymentProfilePage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Perfil de Pago</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlatformPaymentProfile userId={session.user.id} />
    </>
  );
}
