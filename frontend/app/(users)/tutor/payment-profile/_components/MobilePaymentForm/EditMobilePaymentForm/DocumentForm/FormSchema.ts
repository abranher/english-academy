"use client";

import { z } from "zod";
import { DocumentType } from "@/types/enums";
import messages from "@/libs/validations/schemas/messages";

const MIN_DOCUMENT = 7;

export const FormSchema = z.object({
  documentType: z.enum(
    [
      DocumentType.VENEZOLANO,
      DocumentType.EXTRANJERO,
      DocumentType.JURIDICO,
      DocumentType.PASAPORTE,
      DocumentType.GUBERNAMENTAL,
    ],
    {
      required_error: "Debe seleccionar un tipo de documento.",
    }
  ),
  documentNumber: z
    .string()
    .min(MIN_DOCUMENT, messages.min(MIN_DOCUMENT))
    .refine((val) => !isNaN(Number(val)), { message: "Debe ser un número" })
    .transform(Number),
});
