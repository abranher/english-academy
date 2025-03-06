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
import { TutorStatus } from "@/types/enums";
import { ResubmittedTutorsList } from "../ResubmittedTutorsList";

export function ContentPage() {
  return (
    <>
      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <div className="space-between flex items-center">
          <TabsList>
            <TabsTrigger value="ALL">Todos</TabsTrigger>
            <TabsTrigger value={TutorStatus.NEW}>Nuevos</TabsTrigger>
            <TabsTrigger value={TutorStatus.PENDING}>Pendientes</TabsTrigger>
            <TabsTrigger value={TutorStatus.RESUBMITTED}>
              Reenviados
            </TabsTrigger>
            <TabsTrigger value={TutorStatus.APPROVED}>Aprobados</TabsTrigger>
            <TabsTrigger value={TutorStatus.REJECTED}>Rechazados</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ALL" className="border-none p-0 outline-none">
          <AllTutorsList />
        </TabsContent>

        <TabsContent
          value={TutorStatus.NEW}
          className="border-none p-0 outline-none"
        >
          <NewTutorsList />
        </TabsContent>

        <TabsContent
          value={TutorStatus.PENDING}
          className="border-none p-0 outline-none"
        >
          <PendingTutorsList />
        </TabsContent>

        <TabsContent
          value={TutorStatus.RESUBMITTED}
          className="border-none p-0 outline-none"
        >
          <ResubmittedTutorsList />
        </TabsContent>

        <TabsContent
          value={TutorStatus.APPROVED}
          className="border-none p-0 outline-none"
        >
          <ApprovedTutorsList />
        </TabsContent>

        <TabsContent
          value={TutorStatus.REJECTED}
          className="border-none p-0 outline-none"
        >
          <RejectedTutorsList />
        </TabsContent>
      </Tabs>
    </>
  );
}
