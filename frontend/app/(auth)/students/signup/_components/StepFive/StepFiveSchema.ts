"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

export const StepFiveSchema = z.object({
  username: z.string().min(5, messages.min(5)).max(40, messages.max(40)),
});
