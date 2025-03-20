"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

const MIN = 4;

export const FormSchema = z.object({
  title: z.string(messages.requiredError).min(MIN, messages.min(MIN)),
});
