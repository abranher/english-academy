import axios from "@/config/axios";
import { CourseReviewStatus } from "@/types/enums";

export async function getByReviewStatus(status: CourseReviewStatus) {
  const response = await axios.get(`/api/admin/courses/list/status/${status}`);
  return response.data;
}
