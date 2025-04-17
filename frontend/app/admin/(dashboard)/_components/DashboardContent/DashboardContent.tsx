import { Overview } from "./Overview";
import { Analytics } from "./Analytics";

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
            <TabsTrigger value="ANALYTICS">Estadísticas</TabsTrigger>
          </TabsList>
          <TabsContent value="OVERVIEW" className="space-y-4">
            <Overview />
          </TabsContent>

          <TabsContent value="ANALYTICS" className="space-y-4">
            <Analytics />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
