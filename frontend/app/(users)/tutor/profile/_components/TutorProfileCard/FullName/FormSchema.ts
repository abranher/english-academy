"use client";

import { z } from "zod";

import messages from "@/libs/validations/schemas/messages";

export const FormSchema = z.object({
  name: z.string().min(3, messages.min(3)).max(100, messages.max(100)),
  lastName: z.string().min(3, messages.min(3)).max(100, messages.max(100)),
});
