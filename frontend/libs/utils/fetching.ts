import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

export const route = (endpoint: string): string => {
  const baseUrl = NEXT_PUBLIC_BACKEND_URL;

  if (!baseUrl) {
    throw new Error(
      "La variable de entorno NEXT_PUBLIC_BACKEND_URL no está definida."
    );
  }

  return `${baseUrl}${endpoint}`;
};
