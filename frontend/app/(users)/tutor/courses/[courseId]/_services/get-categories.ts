import axios from "@/config/axios";

export async function getCategories() {
  const response = await axios.get(`/api/categories`);
  return response.data;
}
