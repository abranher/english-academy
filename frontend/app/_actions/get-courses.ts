import { Course } from "@/types/models/Course";
import { getProgress } from "./get-progress";
import axios from "@/config/axios";

type CourseWithProgressWithCategory = Course & {
  level: Level | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  studentId: string;
  title?: string;
  levelId?: string;
};

export const getCourses = async ({
  studentId,
  title,
  levelId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const { data: courses } = await axios.get(
      `/api/courses/a4b10c50-5cb5-46da-b20d-340d13523d0b/levels/${levelId}?title=${title}`
    );

  
  } catch (error) {
    console.log(error);
    return [];
  }
};
