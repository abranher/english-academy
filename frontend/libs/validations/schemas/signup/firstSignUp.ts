"use client";

import { z } from "zod";
import messages from "../messages";

export const firstSignUpSchema = z
  .object({
    name: z.string().min(3, messages.min(3)).max(100, messages.max(100)),
    lastName: z.string().min(3, messages.min(3)).max(100, messages.max(100)),
    username: z.string().min(5, messages.min(5)).max(40, messages.max(40)),
    email: z.string().email(messages.email),
    password: z.string().min(8, messages.min(8)),
    confirmPassword: z.string().min(8, messages.min(8)),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Las contraseñas deben ser iguales.",
    path: ["confirmPassword"],
  });
