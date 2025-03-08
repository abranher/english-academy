import { CourseReviewDecision } from "../enums";

export interface CourseReview {
  id: string;
  feedback: string | null;
  decision: CourseReviewDecision | null;
  courseId: string;

  createdAt: Date;
  updatedAt: Date;
}
