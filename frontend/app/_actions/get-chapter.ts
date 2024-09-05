import axios from "@/config/axios";

interface GetChapterProps {
  studentId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  studentId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const { data } = await axios.get(
      `/api/chapters/${chapterId}/student/${studentId}/course/${courseId}/`
    );

    return data;
  } catch (error) {
    console.log(error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      studentProgress: null,
      purchase: null,
    };
  }
};
