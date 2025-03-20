import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { TutorPaymentProfile } from "./_components/TutorPaymentProfile";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function TutorPaymentProfilePage() {
  const session = await auth();

  if (!session) redirect("/tutor/dashboard");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Perfil de Pago</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TutorPaymentProfile userId={session.user.id} />
    </>
  );
}
