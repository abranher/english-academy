import axios from "@/config/axios";

export async function getUserNotifications(userId: string) {
  const response = await axios.get(`/api/notifications/user/${userId}`);
  return response.data;
}
