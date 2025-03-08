"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { getCourseReviews } from "../../_services/get-course-reviews";
import { CourseReviewsSkeleton } from "./CourseReviewsSkeleton";

export function CourseReviewsList() {
  const { courseId } = useParams();

  const {
    isPending,
    data: courseReviewStatus,
    isError,
  } = useQuery({
    queryKey: ["course_reviews_list", courseId],
    queryFn: () => getCourseReviews(courseId as string),
  });

  if (isPending) return <CourseReviewsSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar el historial.</>;

  return <>Hola</>;
}
