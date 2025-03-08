import axios from "@/config/axios";
import { CourseReviewStatus } from "@/types/enums";

export async function getByReviewStatus(
  userId: string,
  status: CourseReviewStatus
) {
  const response = await axios.get(
    `/api/tutors/courses/list/user/${userId}/status/${status}`
  );
  return response.data;
}
