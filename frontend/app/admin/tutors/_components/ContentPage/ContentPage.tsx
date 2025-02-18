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

export function ContentPage() {
  return (
    <>
      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="ALL">Todos</TabsTrigger>
            <TabsTrigger value="PENDING">Nuevos</TabsTrigger>
            <TabsTrigger value="APPROVED">Aprobados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ALL" className="border-none p-0 outline-none">
          <AllTutorsList />
        </TabsContent>

        <TabsContent value="PENDING" className="border-none p-0 outline-none">
          <PendingTutorsList />
        </TabsContent>

        <TabsContent value="APPROVED" className="border-none p-0 outline-none">
          <ApprovedTutorsList />
        </TabsContent>
      </Tabs>
    </>
  );
}
