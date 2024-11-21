import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

export function assetImg(file: string | null): string {
  if (file === null) return "";

  return NEXT_PUBLIC_BACKEND_URL + "/images/" + file;
}

export function assetVideo(file: string | null): string {
  if (file === null) return "";

  return NEXT_PUBLIC_BACKEND_URL + "/videos/" + file;
}
