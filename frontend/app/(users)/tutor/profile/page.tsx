import { auth } from "@/config/auth";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";
import { TutorProfile } from "./_components/TutorProfile";
import { redirect } from "next/navigation";

export default async function TutorProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/tutor/dashboard");
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Perfil</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TutorProfile userId={session.user.id} />
    </>
  );
}
