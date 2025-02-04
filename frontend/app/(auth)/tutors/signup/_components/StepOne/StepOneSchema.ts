"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

export const StepOneSchema = z.object({
  email: z.string().email(messages.email),
});
