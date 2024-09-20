"use client";

import { object, string } from "zod";
import messages from "../messages";

export const signInSchema = object({
  email: string({ required_error: "Correo electrónico es requerido" })
    .min(1, "Correo electrónico es requerido")
    .email("Correo electrónico no válido"),
  password: string({ required_error: "Contraseña es requerida" })
    .min(1, "Contraseña es requerida")
    .min(8, "La contraseña debe tener más de 8 caracteres")
    .max(32, "La contraseña debe tener menos de 32 caracteres"),
});
