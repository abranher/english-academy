"use client";

import { SubscriptionOrderStatus } from "@/types/enums";

import { AllSubscriptionOrders } from "./AllSubscriptionOrders";

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
        <CardTitle>Órdenes de suscripción</CardTitle>
        <CardDescription>
          Accede y gestiona la información de las órdenes de suscripción.
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
            <TabsTrigger value={SubscriptionOrderStatus.COMPLETED}>
              Completadas
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
          {/* <NewTutorsList /> */}
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          {/* <PendingTutorsList /> */}
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          {/* <ResubmittedTutorsList /> */}
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          {/* <ApprovedTutorsList /> */}
        </TabsContent>

        <TabsContent
          value={SubscriptionOrderStatus.UNVERIFIED}
          className="border-none p-0 outline-none"
        >
          {/* <RejectedTutorsList /> */}
        </TabsContent>
      </Tabs>
    </>
  );
}
