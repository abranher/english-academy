"use client";

import { z } from "zod";

export const firstSignUpSchema = z
  .object({
    name: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    username: z.string().min(5).max(40),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords must watch",
    path: ["confirmPassword"],
  });
