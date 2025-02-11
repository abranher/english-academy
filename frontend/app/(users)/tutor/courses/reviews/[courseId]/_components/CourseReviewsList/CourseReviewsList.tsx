"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { getCourseReviews } from "../../_services/get-course-reviews";
import { useParams } from "next/navigation";
import { columns } from "../columns";
import { CourseReviewsSkeleton } from "./CourseReviewsSkeleton";

export function CourseReviewsList() {
  const { courseId } = useParams();

  const {
    isPending,
    error,
    data: courseReviews,
  } = useQuery({
    queryKey: ["course-reviews-list", courseId], // Incluye courseId en la queryKey
    queryFn: () => getCourseReviews(courseId as string),
  });

  return (
    <>
      {isPending ? (
        <>
          <CourseReviewsSkeleton />
        </>
      ) : (
        <>
          <DataTable columns={columns} data={courseReviews} />
        </>
      )}
    </>
  );
}
