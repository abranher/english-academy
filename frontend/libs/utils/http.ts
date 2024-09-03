import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

export function generateBackendImageUrl(imageName: string): string {
  return NEXT_PUBLIC_BACKEND_URL + "/" + imageName;
}
