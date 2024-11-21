import axios from "@/config/axios";

export async function getCategories() {
  const response = await axios.get(`/api/levels/`);
  return response.data;
}
