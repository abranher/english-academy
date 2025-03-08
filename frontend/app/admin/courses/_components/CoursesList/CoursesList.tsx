"use client";

import { CourseReviewStatus } from "@/types/enums";

import { AllCoursesList } from "../AllCoursesList";
import { DraftCoursesList } from "../DraftCoursesList";
import { PendingReviewCoursesList } from "../PendingReviewCoursesList";
import { NeedsRevisionCoursesList } from "../NeedsRevisionCoursesList";
import { ApprovedCoursesList } from "../ApprovedCoursesList";
import { RejectedCoursesList } from "../RejectedCoursesList";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";

export function CoursesList() {
  return (
    <>
      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <section className="flex flex-col gap-2">
          <ScrollArea>
            <div className="py-3">
              <TabsList>
                <TabsTrigger value="ALL">Todos</TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.DRAFT}>
                  Borrador
                </TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.PENDING_REVIEW}>
                  Pendientes de revisión
                </TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.NEEDS_REVISION}>
                  Necesitan revisión
                </TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.APPROVED}>
                  Aprobados
                </TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.REJECTED}>
                  Rechazados
                </TabsTrigger>
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        <TabsContent value="ALL" className="border-none p-0 outline-none">
          <AllCoursesList />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.DRAFT}
          className="border-none p-0 outline-none"
        >
          <DraftCoursesList />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.PENDING_REVIEW}
          className="border-none p-0 outline-none"
        >
          <PendingReviewCoursesList />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.NEEDS_REVISION}
          className="border-none p-0 outline-none"
        >
          <NeedsRevisionCoursesList />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.APPROVED}
          className="border-none p-0 outline-none"
        >
          <ApprovedCoursesList />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.REJECTED}
          className="border-none p-0 outline-none"
        >
          <RejectedCoursesList />
        </TabsContent>
      </Tabs>
    </>
  );
}
