"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

const MIN = 5;
const MAX = 100;

export const FormSchema = z.object({
  title: z.string().min(MIN, messages.min(MIN)).max(MAX, messages.max(MAX)),
});
