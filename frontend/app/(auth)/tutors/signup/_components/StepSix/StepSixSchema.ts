"use client";

import { z } from "zod";
import { differenceInYears, isBefore, isAfter } from "date-fns";

export const StepSixSchema = z.object({
  birth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Por favor, introduce una fecha válida.",
    })
    .refine((val) => isBefore(new Date(val), new Date()), {
      message: "La fecha de nacimiento no puede ser futura.",
    })
    .refine((val) => isAfter(new Date(val), new Date("1900-01-01")), {
      message: "La fecha de nacimiento debe ser posterior a 1900.",
    })
    .refine((val) => differenceInYears(new Date(), new Date(val)) >= 18, {
      message: "Debes tener al menos 18 años para registrarte.",
    }),
});
