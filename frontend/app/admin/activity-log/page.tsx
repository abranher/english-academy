import Link from "next/link";
import { redirect } from "next/navigation";

import axios from "@/config/axios";
import { auth } from "@/config/auth";
import { Roles } from "@/types/enums";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export default async function ActivityLogPage() {
  const session = await auth();

  if (!session) redirect("/");
  if (session.user.role !== Roles.ADMIN) redirect("/");

  const { data: activityLogs } = await axios.get(`/api/activity-logs`);

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
            <BreadcrumbPage>Bitácora</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div>
        <CardTitle>Bitácora</CardTitle>
        <CardDescription>Registro de actividad de los usuarios</CardDescription>
      </div>

      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Historial de Acciones</CardTitle>
            <CardDescription>
              Lista de acciones recientes y eventos registrados en la
              aplicación.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={activityLogs} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
