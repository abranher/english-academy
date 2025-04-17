import { Overview } from "./Overview";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

export function DashboardContent() {
  return (
    <>
      <section>
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          Visualiza y analiza el registro de actividades de los usuarios. Obtén
          información sobre el uso de la aplicación y las interacciones más
          relevantes.
        </CardDescription>
      </section>

      <section className="w-full">
        <Tabs defaultValue="OVERVIEW" className="space-y-4">
          <TabsList>
            <TabsTrigger value="OVERVIEW">Descripción general</TabsTrigger>
            <TabsTrigger value="ANALYTICS" disabled>
              Estadísticas
            </TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reportes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="OVERVIEW" className="space-y-4">
            <Overview />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
