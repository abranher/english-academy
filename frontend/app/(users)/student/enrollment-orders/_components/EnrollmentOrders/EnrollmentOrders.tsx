"use client";

import { EnrollmentOrderStatus } from "@/types/enums";

import { AllEnrollmentOrders } from "./AllEnrollmentOrders";
import { UnverifiedEnrollmentOrders } from "./UnverifiedEnrollmentOrders";
import { NeedsRevisionEnrollmentOrders } from "./NeedsRevisionEnrollmentOrders";
import { ResubmittedEnrollmentOrders } from "./ResubmittedEnrollmentOrders";
import { ApprovedEnrollmentOrders } from "./ApprovedEnrollmentOrders";
import { CanceledEnrollmentOrders } from "./CanceledEnrollmentOrders";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

export function EnrollmentOrders({ studentId }: { studentId: string }) {
  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Mis Órdenes de Inscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de tus órdenes de inscripción.
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
          <AllEnrollmentOrders studentId={studentId} />
        </TabsContent>

        <TabsContent
          value={EnrollmentOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          <UnverifiedEnrollmentOrders studentId={studentId} />
        </TabsContent>

        <TabsContent
          value={EnrollmentOrderStatus.NEEDS_REVISION}
          className="border-none p-0 outline-none"
        >
          <NeedsRevisionEnrollmentOrders studentId={studentId} />
        </TabsContent>

        <TabsContent
          value={EnrollmentOrderStatus.RESUBMITTED}
          className="border-none p-0 outline-none"
        >
          <ResubmittedEnrollmentOrders studentId={studentId} />
        </TabsContent>

        <TabsContent
          value={EnrollmentOrderStatus.APPROVED}
          className="border-none p-0 outline-none"
        >
          <ApprovedEnrollmentOrders studentId={studentId} />
        </TabsContent>

        <TabsContent
          value={EnrollmentOrderStatus.CANCELED}
          className="border-none p-0 outline-none"
        >
          <CanceledEnrollmentOrders studentId={studentId} />
        </TabsContent>
      </Tabs>
    </>
  );
}
