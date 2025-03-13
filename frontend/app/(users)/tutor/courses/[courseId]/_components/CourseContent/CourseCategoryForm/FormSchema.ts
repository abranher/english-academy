"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

const MIN = 1;

export const FormSchema = z.object({
  categoryId: z.string(messages.requiredError).min(MIN, messages.min(MIN)),
});
