"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../data-table";
import { getCourseReviews } from "../../_services/get-course-reviews";
import { useParams, useSearchParams } from "next/navigation";
import { columns } from "../columns";
import { CourseReviewsSkeleton } from "./CourseReviewsSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";

export function CourseReviewsList() {
  const { courseId } = useParams();
  const searchParams = useSearchParams();

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
          <Card>
            <CardHeader>
              <CardTitle>Curso: {searchParams.get("courseTitle")}</CardTitle>
              <CardDescription>
                Tutor: {`@${searchParams.get("tutor")}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={courseReviews} />
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}
