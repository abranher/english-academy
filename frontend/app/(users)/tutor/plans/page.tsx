import { auth } from "@/config/auth";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";
import { redirect } from "next/navigation";

export default async function PlansSubscriptionPage() {
  const session = await auth();

  if (!session) redirect("/tutor/dashboard");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Perfil de Usuario</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

    </>
  );
}
