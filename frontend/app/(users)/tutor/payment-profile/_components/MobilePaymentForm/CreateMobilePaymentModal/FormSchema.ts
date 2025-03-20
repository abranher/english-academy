"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";
import { DocumentType, PhoneCode } from "@/types/enums";

const MIN_BANKID = 1;
const MIN_DOCUMENT = 7;

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
    .regex(/^\d{7}$/, { message: "Debe ser un número de 7 dígitos." }),
  documentType: z.enum([DocumentType.V, DocumentType.J, DocumentType.E], {
    required_error: "Debe seleccionar un tipo de documento.",
  }),
  documentNumber: z
    .string()
    .min(MIN_DOCUMENT, messages.min(MIN_DOCUMENT))
    .refine((val) => !isNaN(Number(val)), { message: "Debe ser un número" })
    .transform(Number),
  bankId: z
    .string(messages.requiredError)
    .min(MIN_BANKID, messages.min(MIN_BANKID)),
});
