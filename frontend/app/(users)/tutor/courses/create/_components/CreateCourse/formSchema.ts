"use client";

import messages from "@/libs/validations/schemas/messages";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});
