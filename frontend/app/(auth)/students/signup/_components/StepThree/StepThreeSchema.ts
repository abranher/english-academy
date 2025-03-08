"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";

export const StepThreeSchema = z
  .object({
    password: z
      .string()
      .min(8, messages.min(8))
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[.,\-_@$])/, {
        message:
          "La contraseña debe contener al menos una mayúscula, un número y un símbolo (., - _ @ $)",
      }),
    confirmPassword: z.string().min(8, messages.min(8)),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Las contraseñas deben ser iguales.",
    path: ["confirmPassword"],
  });
