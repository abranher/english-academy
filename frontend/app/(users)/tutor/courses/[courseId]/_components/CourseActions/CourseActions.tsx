"use client";

import { Course } from "@/types/models/Course";

import { SendToRevision } from "./SendToRevision";
import { CourseArchive } from "./CourseArchive";
import { ReviewStatusBadge } from "@/components/courses/ReviewStatusBadge";
import { CourseReviewStatus } from "@/types/enums";

export function CourseActions({ course }: { course: Course }) {
  return (
    <div className="hidden items-center gap-3 md:ml-auto md:flex">
      <ReviewStatusBadge status={course.reviewStatus} />
      {course.reviewStatus === CourseReviewStatus.DRAFT && <SendToRevision />}
      <CourseArchive />
    </div>
  );
}
