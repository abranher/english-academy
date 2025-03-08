"use client";

import { Course } from "@/types/models/Course";

import { SendToRevision } from "./SendToRevision";
import { CourseArchive } from "./CourseArchive";

export function CourseActions({ course }: { course: Course }) {
  return (
    <div className="hidden items-center gap-3 md:ml-auto md:flex">
      <SendToRevision />
      <CourseArchive />
    </div>
  );
}
