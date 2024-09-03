import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

export function generateBackendImageUrl(imageName: string): string {
  const imageDirectory = "storage/images";
  const imageUrl =
    NEXT_PUBLIC_BACKEND_URL + "/" + imageDirectory + "/" + imageName;
  return imageUrl;
}
