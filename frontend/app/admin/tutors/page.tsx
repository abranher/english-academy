import Link from "next/link";
import axios from "@/config/axios";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

export default async function TurorsAdminPage() {
  const { data } = await axios.get("/api/courses");

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

      <div>
        <CardTitle>Tutores</CardTitle>
        <CardDescription>Listados de Tutores</CardDescription>
      </div>

      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Listado de Solicitudes de Nuevos Tutores</CardTitle>
            <CardDescription>
              En esta sección encontrarás todas las solicitudes de nuevos
              tutores que desean unirse a nuestra plataforma. Revisa cada
              propuesta y ayúdanos a dar la bienvenida a nuevos talentos que
              enriquecerán nuestra comunidad educativa.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </>
  );
}
