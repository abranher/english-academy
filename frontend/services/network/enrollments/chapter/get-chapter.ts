import axios from "@/config/axios";

export async function getChapter(studentId: string, chapterId: string) {
  const response = await axios.get(
    `/api/enrollments/student/${studentId}/chapter/${chapterId}`
  );
  return response.data;
}
