import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

export function assetImg(file: string | null): string {
  if (file === null) return "";
  return `${NEXT_PUBLIC_BACKEND_URL}/storage/images/${file}`;
}

export function assetAttachments(file: string | null): string {
  if (file === null) return "";

  return NEXT_PUBLIC_BACKEND_URL + "/storage/attachments/" + file;
}

export function assetPublicImg(file: string | null): string {
  if (file === null) return "";

  return NEXT_PUBLIC_BACKEND_URL + "/assets/img/" + file;
}

export function assetVideo(file: string | null): string {
  if (file === null) return "";

  return NEXT_PUBLIC_BACKEND_URL + "/videos/" + file;
}
