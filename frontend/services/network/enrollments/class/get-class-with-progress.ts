import axios from "@/config/axios";

export async function getClassWithProgress(studentId: string, classId: string) {
  const response = await axios.get(
    `/api/class-progress/student/${studentId}/class/${classId}`
  );
  return response.data;
}
