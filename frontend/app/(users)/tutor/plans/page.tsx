import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { PlanSubscriptionContent } from "./_components/PlanSubscriptionContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function PlanSubscriptionPage() {
  const session = await auth();

  if (!session) redirect("/tutor/dashboard");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Planes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlanSubscriptionContent />
    </>
  );
}
