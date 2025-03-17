import axios from "@/config/axios";

export async function getAttachments(userId: string) {
  const response = await axios.get(`/api/attachments/user/${userId}`);
  return response.data;
}
