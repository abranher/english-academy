"use client";

import { formatDate } from "@/libs/date";
import { CourseReview } from "@/types/models/CourseReview";

import { ReviewDecisionBadge } from "@/components/courses/ReviewDecisionBadge";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { CalendarDays, Eye, NotebookPen, UserPen } from "lucide-react";

export function ShowCourseReviewModal({
  courseReview,
}: {
  courseReview: CourseReview;
}) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <Eye className="w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <CardTitle>Detalle</CardTitle>
          </DialogHeader>
          <section className="flex flex-col gap-3">
            <article className="flex flex-col gap-1">
              <DialogTitle className="flex gap-1 items-center">
                <NotebookPen className="w-4" />
                Comentario:
              </DialogTitle>
              <CardDescription>
                {courseReview.feedback ?? "Sin revisar"}
              </CardDescription>
            </article>

            <article className="flex gap-2">
              <DialogTitle className="flex gap-1 items-center">
                <UserPen className="w-4" />
                Decisión:
              </DialogTitle>
              <div className="flex">
                <ReviewDecisionBadge status={courseReview.decision ?? ""} />
              </div>
            </article>

            <article className="flex flex-col gap-1">
              <DialogTitle className="flex gap-1 items-center">
                <CalendarDays className="w-4" />
                Tutor envió a revisión:
              </DialogTitle>
              <CardDescription>
                {formatDate(courseReview.createdAt)}
              </CardDescription>
            </article>

            {courseReview.reviewedAt && (
              <article className="flex flex-col gap-1">
                <DialogTitle className="flex gap-1 items-center">
                  <CalendarDays className="w-4" />
                  Revisado:
                </DialogTitle>
                <CardDescription>
                  {formatDate(courseReview.reviewedAt)}
                </CardDescription>
              </article>
            )}
          </section>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cerrar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
