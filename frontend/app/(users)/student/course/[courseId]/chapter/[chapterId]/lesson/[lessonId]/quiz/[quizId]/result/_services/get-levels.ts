import axios from "@/config/axios";

export async function getLevels() {
  const response = await axios.get(`/api/levels`);
  return response.data;
}
