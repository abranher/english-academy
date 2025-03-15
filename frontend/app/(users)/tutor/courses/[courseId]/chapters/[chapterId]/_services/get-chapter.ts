import axios from "@/config/axios";

export async function getChapter(chapterId: string, courseId: string) {
  const response = await axios.get(
    `/api/chapters/${chapterId}/course/${courseId}`
  );
  return response.data;
}
