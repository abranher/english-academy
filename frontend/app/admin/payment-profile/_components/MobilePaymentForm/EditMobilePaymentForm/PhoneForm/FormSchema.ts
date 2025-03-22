"use client";

import { z } from "zod";
import { PhoneCode } from "@/types/enums";

export const FormSchema = z.object({
  phoneCode: z.enum(
    [
      PhoneCode.VE_0412,
      PhoneCode.VE_0414,
      PhoneCode.VE_0416,
      PhoneCode.VE_0424,
      PhoneCode.VE_0426,
    ],
    {
      required_error: "Debe seleccionar un código de télefono.",
    }
  ),
  phoneNumber: z
    .string()
    .regex(/^\d{7}$/, { message: "Debe ser un número de 7 dígitos." })
    .refine((val) => !isNaN(Number(val)), { message: "Debe ser un número" })
    .transform(Number),
});
