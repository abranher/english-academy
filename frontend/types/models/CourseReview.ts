import { CourseReviewDecision } from "../enums";
import { Course } from "./Course";

export interface CourseReview {
  id: string;
  feedback: string | null;
  decision: CourseReviewDecision | null;
  reviewedAt: Date | null;

  courseId: string;

  course: Course;

  createdAt: Date;
  updatedAt: Date;
}
