"use client";

import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { CourseReviewStatus } from "@/types/enums";
import { AllCoursesList } from "../AllCoursesList";
import { DraftCoursesList } from "../DraftCoursesList";
import { ScrollArea, ScrollBar } from "@/components/shadcn/ui/scroll-area";

export function CoursesList({ userId }: { userId: string }) {
  /*switch () {
    case CoursePlatformStatus.DRAFT:
      statusText = "Borrador";
      badgeColor = "bg-slate-500";
      break;
    case CoursePlatformStatus.PUBLISHED:
      statusText = "Publicado";
      badgeColor = "bg-sky-700";
      break;
    case CoursePlatformStatus.ARCHIVED:
      statusText = "Archivado";
      badgeColor = "bg-gray-500";
      break;
    case CoursePlatformStatus.DELETED:
      statusText = "Eliminado";
      badgeColor = "bg-red-500";
      break;
    default: // Handle unexpected cases
      statusText = "Desconocido";
      badgeColor = "bg-yellow-500";
  }
  */

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
                  En Borrador
                </TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.PENDING_REVIEW}>
                  Pendientes
                </TabsTrigger>
                <TabsTrigger value={CourseReviewStatus.NEEDS_REVISION}>
                  Reenviados
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
          <DraftCoursesList />
        </TabsContent>
      </Tabs>
    </>
  );
}
