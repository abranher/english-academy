"use client";

import { z } from "zod";

export const FormSchema = z.object({
  paymentReference: z
    .string()
    .regex(/^\d{6}$/, { message: "Debe ser un número de 6 dígitos." })
    .refine((val) => !isNaN(Number(val)), { message: "Debe ser un número" })
    .transform(Number),
});
