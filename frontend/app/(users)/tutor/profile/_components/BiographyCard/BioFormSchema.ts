"use client";

import { z } from "zod";

import messages from "@/libs/validations/schemas/messages";

// TODO -> Improve the validation of the bio since it receives
// a formatted string that makes the min detect the format as characters
const MAX = 450;
const MIN = 17;

export const BioFormSchema = z.object({
  bio: z.string().min(MIN, messages.min(MIN)).max(MAX, messages.max(MAX)),
});
