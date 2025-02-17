"use client";

import { z } from "zod";

export const StepSixSchema = z.object({
  birth: z.date({
    required_error: "Se requiere una fecha de nacimiento.",
  }),
});
