"use client";

import { z } from "zod";
import { EnrollmentOrderStatus } from "@/types/enums";
import messages from "@/libs/validations/schemas/messages";

export const FormSchema = z.object({
  comment: z.string().min(30, messages.min(30)).max(160, messages.max(160)),
  status: z.enum(
    [
      EnrollmentOrderStatus.NEEDS_REVISION,
      EnrollmentOrderStatus.APPROVED,
      EnrollmentOrderStatus.CANCELED,
    ],
    { required_error: "Debe seleccionar un status." }
  ),
});
