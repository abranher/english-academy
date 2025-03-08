"use client";

import { CourseReview } from "@/types/models/CourseReview";
import { truncateString } from "@/libs/format";
import { formatDateNormal } from "@/libs/date";

import { ReviewDecisionBadge } from "@/components/courses/ReviewDecisionBadge";
import { ShowCourseReviewModal } from "../ShowCourseReviewModal";

import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { CalendarDays, NotebookPen, UserPen } from "lucide-react";

export function CourseReviewCard({
  courseReview,
}: {
  courseReview: CourseReview;
}) {
  return (
    <>
      <Card className="flex flex-col gap-3 rounded-lg border p-6">
        <section className="flex justify-between">
          <CardTitle>Detalle</CardTitle>

          <section className="flex items-center gap-3">
            <ReviewDecisionBadge status={courseReview.decision ?? ""} />

            <ShowCourseReviewModal courseReview={courseReview} />
          </section>
        </section>
        <div className="flex justify-between gap-3">
          <article className="flex flex-col gap-1">
            <CardTitle className="flex gap-1 items-center text-lg">
              <NotebookPen className="w-4" />
              Comentario:
            </CardTitle>
            <CardDescription>
              {truncateString(courseReview.feedback ?? "Sin revisar")}
            </CardDescription>
          </article>

          <article className="flex flex-col gap-1">
            <CardTitle className="flex gap-1 items-center text-lg">
              <UserPen className="w-4" />
              Decisión:
            </CardTitle>
            <CardDescription className="flex justify-center">
              <ReviewDecisionBadge status={courseReview.decision ?? ""} />
            </CardDescription>
          </article>

          <article className="flex flex-col gap-1">
            <CardTitle className="flex gap-1 items-center text-lg">
              <CalendarDays className="w-4" />
              Revisado:
            </CardTitle>
            <CardDescription>
              {courseReview.reviewedAt === null ? (
                <>Sin revisar</>
              ) : (
                <>{formatDateNormal(courseReview.reviewedAt)}</>
              )}
            </CardDescription>
          </article>
        </div>
      </Card>
    </>
  );
}
