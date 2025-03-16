"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

const MIN = 100;

export const FormSchema = z.object({
  requirements: z.string(messages.requiredError).min(MIN, messages.min(MIN)),
});
