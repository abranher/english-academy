"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getCourseReviews } from "../../_services/get-course-reviews";
import { CourseReview } from "@/types/models/CourseReview";

import { CourseReviewsSkeleton } from "./CourseReviewsSkeleton";

import { FolderOpen } from "lucide-react";
import { CourseReviewCard } from "../CourseReviewCard";

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
          <>
            <article className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Aun no has enviado a revisión.
              </p>
            </article>
          </>
        ) : (
          <section className="flex flex-col gap-4">
            {courseReviews.map((courseReview: CourseReview) => (
              <CourseReviewCard
                key={courseReview.id}
                courseReview={courseReview}
              />
            ))}
          </section>
        )}
      </section>
    </>
  );
}
