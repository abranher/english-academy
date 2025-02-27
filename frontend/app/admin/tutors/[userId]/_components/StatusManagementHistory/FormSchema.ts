"use client";

import { z } from "zod";
import { TutorStatus } from "@/types/enums";
import messages from "@/libs/validations/schemas/messages";

export const FormSchema = z.object({
  comment: z.string().min(30, messages.min(30)).max(160, messages.max(160)),
  status: z.enum(
    [TutorStatus.PENDING, TutorStatus.APPROVED, TutorStatus.REJECTED],
    { required_error: "Debe seleccionar un status." }
  ),
});
