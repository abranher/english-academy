import axios from "@/config/axios";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/config/auth";

export default async function TutorHomePage() {
  const session = await auth();

  const { data: courses } = await axios.get(
    `/api/courses/tutor/${session?.user.tutor?.id} `
  );

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Tus cursos</h3>
          <p className="text-sm text-muted-foreground">
            Listado de todos tus cursos.
          </p>
        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ingresos totales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20,1% respecto al mes pasado
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Suscripciones
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180,1% respecto al mes pasado
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventas</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% respecto al mes pasado
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Activo ahora
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 desde la última hora
              </p>
            </CardContent>
          </Card>
        </div>

        <DataTable columns={columns} data={courses} />
      </div>
    </>
  );
}
