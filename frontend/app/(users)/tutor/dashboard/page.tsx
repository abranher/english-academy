import { redirect } from "next/navigation";

import { auth } from "@/config/auth";
import { validateTutorSession } from "@/libs/middleware/authValidation";

import { TutorDashboard } from "./_components/TutorDashboard";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function TutorDashboardPage() {
  await validateTutorSession();

  const session = await auth();

  if (!session) redirect("/");
  if (!session.user.tutor) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TutorDashboard tutorId={session.user.tutor.id} />
    </>
  );
}
