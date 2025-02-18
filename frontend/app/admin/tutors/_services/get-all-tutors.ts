import axios from "@/config/axios";

export async function getAllTutors() {
  const response = await axios.get(`/api/admin/tutors`);
  return response.data;
}
