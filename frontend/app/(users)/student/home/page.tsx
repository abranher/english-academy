import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

import { StudentHome } from "./_components/StudentHome";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";

export default async function StudentHomePage() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Inicio</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <StudentHome userId={session.user.id} />
    </>
  );
}
