import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { TutorProfile } from "./_components/TutorProfile";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function TutorProfilePage() {
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

      <TutorProfile userId={session.user.id} />
    </>
  );
}
