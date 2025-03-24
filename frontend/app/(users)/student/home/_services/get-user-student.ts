import axios from "@/config/axios";

export async function getUserStudent(userId: string) {
  const response = await axios.get(`/api/students/user/${userId}`);
  return response.data;
}
