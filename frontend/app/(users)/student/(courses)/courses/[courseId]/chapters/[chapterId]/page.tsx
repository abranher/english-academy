"use client";

import axios from "@/config/axios";
import { Chapter } from "@/types/models/Chapter";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChapterIdPage() {
  const [chapter, setChapter] = useState();
  const { courseId, chapterId } = useParams();

  const {
    isPending,
    error,
    data: course,
  } = useQuery({
    queryKey: ["course-purchased-chapter-page"],
    queryFn: async () => {
      const response = await axios.get(`/api/purchases/course/${courseId}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (!course) return;

    const filteredChapter = course.chapters.find(
      (chapter: Chapter) => chapter.id === chapterId
    );
    setChapter(filteredChapter || null);
  }, [course, chapterId]);

  return (
    <>
      {!isPending ? (
        <>
          <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
            <h2>{chapter.title}</h2>
            <p>{chapter.description}</p>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-lg lg:col-span-2 flex flex-col gap-5">
            <h2>{}</h2>
          </div>
        </>
      )}
    </>
  );
}
