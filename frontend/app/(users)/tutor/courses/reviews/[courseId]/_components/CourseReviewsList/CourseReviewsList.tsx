"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getCourseReviews } from "../../_services/get-course-reviews";
import { CourseReviewsSkeleton } from "./CourseReviewsSkeleton";
import { Card, CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { CalendarDays, CircleCheck, NotebookPen, UserPen } from "lucide-react";
import { ShowCourseReviewModal } from "../ShowCourseReviewModal";
import { CourseReview } from "@/types/models/CourseReview";
import { formatDateNormal } from "@/libs/date";
import { truncateString } from "@/libs/format";
import { CourseReviewDecision } from "@/types/enums";

export function CourseReviewsList() {
  const { courseId } = useParams();

  const {
    isPending,
    data: courseReviews,
    isError,
  } = useQuery<CourseReview[] | []>({
    queryKey: ["course_reviews_list", courseId],
    queryFn: () => getCourseReviews(courseId as string),
  });

  if (isPending) return <CourseReviewsSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar el historial.</>;

  return (
    <>
      <section>
        {courseReviews.length === 0 ? (
          <></>
        ) : (
          <>
            {courseReviews.map((courseReview: CourseReview) => (
              <section
                key={courseReview.id}
                className="flex flex-col gap-3 rounded-lg border p-4 dark:border-zinc-700"
              >
                <section className="flex justify-between">
                  <CardTitle>Detalle</CardTitle>

                  <section className="flex items-center gap-3">
                    {courseReview.decision === null ? (
                      <>Sin desicion</>
                    ) : (
                      <>
                        {courseReview.decision ===
                          CourseReviewDecision.APPROVED && (
                          <Badge className="flex gap-1 items-center">
                            <CircleCheck className="w-4" />
                            Aprobado
                          </Badge>
                        )}
                        {courseReview.decision ===
                          CourseReviewDecision.NEEDS_CHANGES && (
                          <>
                            <Badge
                              variant="secondary"
                              className="flex gap-1 items-center"
                            >
                              <CircleCheck className="w-4" />
                              Necesita cambios
                            </Badge>
                          </>
                        )}
                      </>
                    )}

                    <ShowCourseReviewModal history={history} />
                  </section>
                </section>
                <div className="flex justify-between gap-3">
                  <article className="flex flex-col gap-1">
                    <CardTitle className="flex gap-1 items-center text-lg">
                      <NotebookPen className="w-4" />
                      Comentario:
                    </CardTitle>
                    <CardDescription>
                      {truncateString(history.comment)}
                    </CardDescription>
                  </article>

                  <article className="flex flex-col gap-1">
                    <CardTitle className="flex gap-1 items-center text-lg">
                      <UserPen className="w-4" />
                      Status previo:
                    </CardTitle>
                    <div className="flex justify-center">
                      <StatusBadge status={history.previousStatus} />
                    </div>
                  </article>

                  <article className="flex flex-col gap-1">
                    <CardTitle className="flex gap-1 items-center text-lg">
                      <CalendarDays className="w-4" />
                      Cambio de status:
                    </CardTitle>
                    <CardDescription>
                      {formatDateNormal(history.createdAt)}
                    </CardDescription>
                  </article>
                </div>
              </section>
            ))}
          </>
        )}
      </section>
    </>
  );
}
