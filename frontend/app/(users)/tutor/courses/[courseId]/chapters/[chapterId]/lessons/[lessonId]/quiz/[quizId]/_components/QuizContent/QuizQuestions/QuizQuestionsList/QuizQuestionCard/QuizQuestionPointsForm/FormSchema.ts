"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

export const FormSchema = z.object({
  points: z
    .string(messages.requiredError)
    .regex(/^\d+$/, { message: "Solo se permiten números" }) // Solo dígitos
    .refine((val) => !isNaN(Number(val)), {
      message: "Debe ser un número válido",
    })
    .transform(Number) // Convertir a número
    .refine((val) => val >= 1 && val <= 15, {
      message: "El valor debe estar entre 1 y 15",
    }),
});
