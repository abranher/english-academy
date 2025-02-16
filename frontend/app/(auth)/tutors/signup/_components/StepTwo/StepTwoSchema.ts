"use client";

import { z } from "zod";

export const StepTwoSchema = z.object({
  token: z
    .string()
    .min(6, {
      message: "Su token de un solo uso debe tener 6 caracteres.",
    })
    .regex(/^\d+$/, {
      message: "El token debe contener solo números.",
    }),
});
