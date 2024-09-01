"use client";

import { z } from "zod";
import messages from "../messages";

export const signInSchema = z.object({
  email: z.string().email(messages.email),
  password: z.string().min(8, messages.min(8)),
});
