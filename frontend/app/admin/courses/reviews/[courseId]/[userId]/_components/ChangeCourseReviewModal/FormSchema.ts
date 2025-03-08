"use client";

import { z } from "zod";
import { CourseReviewDecision } from "@/types/enums";
import messages from "@/libs/validations/schemas/messages";

const MIN = 30;
const MAX = 460;

export const FormSchema = z.object({
  feedback: z.string().min(MIN, messages.min(MIN)).max(MAX, messages.max(MAX)),
  decision: z.enum(
    [
      CourseReviewDecision.NEEDS_CHANGES,
      CourseReviewDecision.APPROVED,
      CourseReviewDecision.REJECTED,
    ],
    { required_error: "Debe seleccionar una decisión." }
  ),
});
