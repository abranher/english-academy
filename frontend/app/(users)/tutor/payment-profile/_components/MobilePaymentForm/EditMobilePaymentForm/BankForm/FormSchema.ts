"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

const MIN_BANKID = 1;

export const FormSchema = z.object({
  bankId: z
    .string(messages.requiredError)
    .min(MIN_BANKID, messages.min(MIN_BANKID)),
});
