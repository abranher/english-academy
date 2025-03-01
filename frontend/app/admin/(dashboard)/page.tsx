import { redirect } from "next/navigation";

import { Button } from "@/components/shadcn/ui/button";
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
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/shadcn/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { auth } from "@/config/auth";
import { Roles } from "@/types/enums/Roles";
import { Overview } from "./_components/Overview";

export default async function DashboardAdminPage() {
  const session = await auth();

  if (session!.user.role !== Roles.ADMIN) {
    redirect("/");
  }

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Visualiza y analiza el registro de actividades de los usuarios. Obtén
          información sobre el uso de la aplicación y las interacciones más
          relevantes.
        </CardDescription>
      </section>

      <div className="w-full">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Descripción general</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reportes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Overview />
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle>Archive Product</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div></div>
              <Button size="sm" variant="secondary">
                Archive Product
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
