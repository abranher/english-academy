import axios from "@/config/axios";

export async function getRejectedTutors() {
  const response = await axios.get(`/api/admin/tutors/approved`);
  return response.data;
}
