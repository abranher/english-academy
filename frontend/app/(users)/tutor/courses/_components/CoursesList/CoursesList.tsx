"use client";

import Link from "next/link";

import { CourseReviewStatus } from "@/types/enums";

import { AllCoursesList } from "../AllCoursesList";
import { DraftCoursesList } from "../DraftCoursesList";
import { PendingReviewCoursesList } from "../PendingReviewCoursesList";
import { NeedsRevisionCoursesList } from "../NeedsRevisionCoursesList";
import { ApprovedCoursesList } from "../ApprovedCoursesList";

import { Button } from "@/components/shadcn/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";

export function CoursesList({ userId }: { userId: string }) {
  return (
    <>
      <Tabs defaultValue="ALL" className="h-full space-y-6">
        <section className="flex flex-col gap-2">
          <article className="flex justify-end">
            <Link href="/tutor/courses/create">
              <Button>
                <PlusCircle className="h-6 w-6 mr-2" />
                Nuevo curso
              </Button>
            </Link>
          </article>

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
          <AllCoursesList userId={userId} />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.DRAFT}
          className="border-none p-0 outline-none"
        >
          <DraftCoursesList userId={userId} />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.PENDING_REVIEW}
          className="border-none p-0 outline-none"
        >
          <PendingReviewCoursesList userId={userId} />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.NEEDS_REVISION}
          className="border-none p-0 outline-none"
        >
          <NeedsRevisionCoursesList userId={userId} />
        </TabsContent>

        <TabsContent
          value={CourseReviewStatus.APPROVED}
          className="border-none p-0 outline-none"
        >
          <ApprovedCoursesList userId={userId} />
        </TabsContent>
      </Tabs>
    </>
  );
}
