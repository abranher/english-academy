import Link from "next/link";

import { TutorsContent } from "./_components/TutorsContent";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";

export default function TurorsAdminPage() {
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

      <CardTitle>Tutores</CardTitle>
      <CardDescription>Listados de Tutores</CardDescription>

      <TutorsContent />
    </>
  );
}
