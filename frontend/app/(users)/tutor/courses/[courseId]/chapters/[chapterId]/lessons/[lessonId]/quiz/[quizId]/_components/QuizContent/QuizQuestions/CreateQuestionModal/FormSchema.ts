"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

const MIN = 10;

export const FormSchema = z.object({
  question: z.string(messages.requiredError).min(MIN, messages.min(MIN)),
});
