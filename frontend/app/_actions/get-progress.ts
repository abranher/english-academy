import axios from "@/config/axios";

export const getProgress = async (
  studentId: string,
  courseId: string
): Promise<number> => {
  const { data } = await axios.get(
    `/api/courses/${studentId}/progress/${courseId}`
  );

  console.log(data);

  return data.progressPercentage;
};
