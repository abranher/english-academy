import { Course } from "@/types/models/Course";
import { Level } from "@/types/models/Level";
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
      `/api/courses/a604f6bd-99af-4ad5-9c92-2a8c629e99d3/levels/${levelId}?title=${title}`
    );

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course: any) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(studentId, course.id);
          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log(error);
    return [];
  }
};
