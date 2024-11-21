import axios from "@/config/axios";

export async function getSubCategories() {
  const response = await axios.get(`/api/subcategories`);
  return response.data;
}
