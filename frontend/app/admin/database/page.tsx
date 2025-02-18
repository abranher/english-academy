import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/config/auth";
import { Roles } from "@/types/enums/Roles";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";

import ContentPage from "./_components/ContentPage";

export default async function DatabasePage() {
  const session = await auth();

  if (session!.user.role !== Roles.ADMIN) {
    redirect("/");
  }

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
            <BreadcrumbPage>Base de datos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <CardTitle>Respaldo de Base de datos</CardTitle>
        <CardDescription>
          En esta sección, puedes realizar respaldos completos de la base de
          datos para garantizar la seguridad y disponibilidad de tus datos.{" "}
        </CardDescription>
      </div>

      <div className="flex gap-3">
        <ContentPage />
      </div>
    </>
  );
}
