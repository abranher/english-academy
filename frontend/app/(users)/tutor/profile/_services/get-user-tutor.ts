import axios from "@/config/axios";

export async function getUserTutor(userId: string) {
  const response = await axios.get(`/api/admin/tutors/user/${userId}`);
  return response.data;
}
