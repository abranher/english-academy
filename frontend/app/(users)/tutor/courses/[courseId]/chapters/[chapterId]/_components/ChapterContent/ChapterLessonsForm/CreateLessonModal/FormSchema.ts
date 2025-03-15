"use client";

import { z } from "zod";
import messages from "@/libs/validations/schemas/messages";
import { LessonType } from "@/types/enums";

const MIN = 4;

export const FormSchema = z.object({
  title: z.string(messages.requiredError).min(MIN, messages.min(MIN)),
  type: z.enum([LessonType.CLASS, LessonType.QUIZ], {
    required_error: "Debe seleccionar un tipo.",
  }),
});
