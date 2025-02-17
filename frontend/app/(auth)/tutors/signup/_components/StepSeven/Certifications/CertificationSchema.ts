"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

export const CertificationSchema = z.object({
  name: z.string().min(2, messages.min(2)).max(100, messages.max(100)),
  issuingOrganization: z
    .string()
    .min(2, messages.min(2))
    .max(100, messages.max(100)),
});
