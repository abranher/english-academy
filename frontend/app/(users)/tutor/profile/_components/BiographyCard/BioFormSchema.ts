"use client";

import { z } from "zod";

import messages from "@/libs/validations/schemas/messages";

// TODO -> Improve the validation of the bio since it receives
// a formatted string that makes the min detect the format as characters
export const BioFormSchema = z.object({
  bio: z.string().min(17, messages.min(10)).max(100, messages.max(100)),
});
