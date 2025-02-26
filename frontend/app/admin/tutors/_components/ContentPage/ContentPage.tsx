"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";

import { AllTutorsList } from "../AllTutorsList";
import { PendingTutorsList } from "../PendingTutorsList";
import { ApprovedTutorsList } from "../ApprovedTutorsList";
import { RejectedTutorsList } from "../RejectedTutorsList";
import { NewTutorsList } from "../NewTutorsList";

export function ContentPage() {
  return (
    <>
      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="ALL">Todos</TabsTrigger>
            <TabsTrigger value="NEW">Nuevos</TabsTrigger>
            <TabsTrigger value="PENDING">Pendientes</TabsTrigger>
            <TabsTrigger value="APPROVED">Aprobados</TabsTrigger>
            <TabsTrigger value="REJECTED">Rechazados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ALL" className="border-none p-0 outline-none">
          <AllTutorsList />
        </TabsContent>

        <TabsContent value="NEW" className="border-none p-0 outline-none">
          <NewTutorsList />
        </TabsContent>

        <TabsContent value="PENDING" className="border-none p-0 outline-none">
          <PendingTutorsList />
        </TabsContent>

        <TabsContent value="APPROVED" className="border-none p-0 outline-none">
          <ApprovedTutorsList />
        </TabsContent>

        <TabsContent value="REJECTED" className="border-none p-0 outline-none">
          <RejectedTutorsList />
        </TabsContent>
      </Tabs>
    </>
  );
}
