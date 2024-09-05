import { Chapter } from "@/types/models/Chapter";
import { Course } from "@/types/models/Course";
import { StudentProgress } from "@/types/models/StudentProgress";
import React from "react";
import CourseMobileSidebar from "./CourseMobileSidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: StudentProgress[] | null;
    })[];
  };
  progressCount: number;
}

export default function CourseNavbar({
  course,
  progressCount,
}: CourseNavbarProps) {
  return (
    <>
      <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <CourseMobileSidebar course={course} progressCount={progressCount} />
      </div>
    </>
  );
}
