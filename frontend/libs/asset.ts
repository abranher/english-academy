import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

export default function asset(file: string | null): string {
  if (file === null) return "";

  return NEXT_PUBLIC_BACKEND_URL + "/" + file;
}
