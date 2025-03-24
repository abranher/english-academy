"use client";

import { SubscriptionOrderStatus } from "@/types/enums";

import { AllSubscriptionOrders } from "./AllSubscriptionOrders";
import { UnverifiedSubscriptionOrders } from "./UnverifiedSubscriptionOrders";
import { NeedsRevisionSubscriptionOrders } from "./NeedsRevisionSubscriptionOrders";
import { ResubmittedSubscriptionOrders } from "./ResubmittedSubscriptionOrders";
import { ApprovedSubscriptionOrders } from "./ApprovedSubscriptionOrders";
import { CanceledSubscriptionOrders } from "./CanceledSubscriptionOrders";

import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

export function SubscriptionOrders() {
  return (
    <>
      <section className="flex flex-col gap-1">
        <CardTitle>Mis Órdenes de suscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de tus órdenes de suscripción.
        </CardDescription>
      </section>

      <Separator />

      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="ALL">Todas</TabsTrigger>
            <TabsTrigger value={SubscriptionOrderStatus.UNVERIFIED}>
              Sin verificar
            </TabsTrigger>
            <TabsTrigger value={SubscriptionOrderStatus.NEEDS_REVISION}>
              Necesitan revisión
            </TabsTrigger>
            <TabsTrigger value={SubscriptionOrderStatus.RESUBMITTED}>
              Reenviadas
            </TabsTrigger>
            <TabsTrigger value={SubscriptionOrderStatus.APPROVED}>
              Aprobadas
            </TabsTrigger>
            <TabsTrigger value={SubscriptionOrderStatus.CANCELED}>
              Canceladas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ALL" className="border-none p-0 outline-none">
          <AllSubscriptionOrders />
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          <UnverifiedSubscriptionOrders />
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.NEEDS_REVISION}
          className="border-none p-0 outline-none"
        >
          <NeedsRevisionSubscriptionOrders />
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.RESUBMITTED}
          className="border-none p-0 outline-none"
        >
          <ResubmittedSubscriptionOrders />
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.APPROVED}
          className="border-none p-0 outline-none"
        >
          <ApprovedSubscriptionOrders />
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.CANCELED}
          className="border-none p-0 outline-none"
        >
          <CanceledSubscriptionOrders />
        </TabsContent>
      </Tabs>
    </>
  );
}
