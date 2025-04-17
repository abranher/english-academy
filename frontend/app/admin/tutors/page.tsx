import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth";
import { Roles } from "@/types/enums";

import { TutorsContent } from "./_components/TutorsContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

export default async function TutorsAdminPage() {
  const session = await auth();

  if (!session) redirect("/");
  if (session.user.role !== Roles.ADMIN) redirect("/");

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Tutores</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <TutorsContent />
    </>
  );
}
