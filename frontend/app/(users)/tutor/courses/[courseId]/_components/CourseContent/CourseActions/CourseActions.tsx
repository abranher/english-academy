"use client";

import { Course } from "@/types/models/Course";
import { CourseReviewStatus, CoursePlatformStatus } from "@/types/enums";

import { ReviewStatusBadge } from "@/components/courses/ReviewStatusBadge";
import { SendToRevision } from "./SendToRevision";
import { CourseArchive } from "./CourseArchive";
import { CoursePublish } from "./CoursePublish";

export function CourseActions({
  course,
  userId,
  tutorId,
}: {
  course: Course;
  userId: string;
  tutorId: string;
}) {
  const showPublishButton =
    course.reviewStatus === CourseReviewStatus.APPROVED &&
    course.platformStatus !== CoursePlatformStatus.PUBLISHED;

  const showArchiveButton =
    course.reviewStatus === CourseReviewStatus.APPROVED &&
    course.platformStatus === CoursePlatformStatus.PUBLISHED;

  return (
    <section className="hidden items-center gap-3 md:ml-auto md:flex">
      <ReviewStatusBadge status={course.reviewStatus} />

      {(course.reviewStatus === CourseReviewStatus.DRAFT ||
        course.reviewStatus === CourseReviewStatus.NEEDS_REVISION) && (
        <SendToRevision />
      )}

      {showArchiveButton && <CourseArchive userId={userId} tutorId={tutorId} />}
      {showPublishButton && <CoursePublish userId={userId} tutorId={tutorId} />}
    </section>
  );
}
