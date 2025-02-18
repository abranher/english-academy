"use client";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "../data-table";
import { getCoursesPendingReview } from "../../_services/get-courses-pending-review";
import { columns } from "../columns";
import { CoursesPendingReviewListSkeleton } from "./CoursesPendingReviewListSkeleton";

export function CoursesPendingReviewList() {
  const {
    isPending,
    error,
    data: coursesPendingReview,
  } = useQuery({
    queryKey: ["courses-pending-review-list"],
    queryFn: getCoursesPendingReview,
  });

  console.log(coursesPendingReview);

  return (
    <>
      {isPending ? (
        <>
          <CoursesPendingReviewListSkeleton />
        </>
      ) : (
        <>
          <DataTable columns={columns} data={coursesPendingReview} />
        </>
      )}
    </>
  );
}
