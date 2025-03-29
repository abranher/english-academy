"use client";

import { EnrollmentOrderStatus } from "@/types/enums";

import { AllEnrollmentOrders } from "./AllEnrollmentOrders";
import { UnverifiedEnrollmentOrders } from "./UnverifiedEnrollmentOrders";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

export function EnrollmentOrders({ tutorId }: { tutorId: string }) {
  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Órdenes de Inscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de las órdenes de inscripción.
        </CardDescription>
      </section>

      <Separator />

      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="ALL">Todas</TabsTrigger>
            <TabsTrigger value={EnrollmentOrderStatus.UNVERIFIED}>
              Sin verificar
            </TabsTrigger>
            <TabsTrigger value={EnrollmentOrderStatus.NEEDS_REVISION}>
              Necesitan revisión
            </TabsTrigger>
            <TabsTrigger value={EnrollmentOrderStatus.RESUBMITTED}>
              Reenviadas
            </TabsTrigger>
            <TabsTrigger value={EnrollmentOrderStatus.APPROVED}>
              Aprobadas
            </TabsTrigger>
            <TabsTrigger value={EnrollmentOrderStatus.CANCELED}>
              Canceladas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ALL" className="border-none p-0 outline-none">
          <AllEnrollmentOrders tutorId={tutorId} />
        </TabsContent>

        <TabsContent
          value={EnrollmentOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          <UnverifiedEnrollmentOrders tutorId={tutorId} />
        </TabsContent>
      </Tabs>
    </>
  );
}
