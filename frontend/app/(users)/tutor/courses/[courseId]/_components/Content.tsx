import { Course } from "@/types/models/Course";
import React from "react";
import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import ImageForm from "./ImageForm";
import LevelForm from "./LevelForm";
import ChaptersForm from "./ChaptersForm";
import PriceForm from "./PriceForm";
import AttachmentForm from "./AttachmentForm";

export default function Content({ course }: { course: Course }) {
  return (
    <>
      <TitleForm initialData={course} courseId={course.id} />
      <DescriptionForm
        description={course.description ?? ""}
        courseId={course.id}
      />
      <ImageForm initialData={course} courseId={course.id} />
      <LevelForm
        initialData={course}
        courseId={course.id}
        options={levels.map((level: any) => ({
          label: `${level.levelCode} - ${level.title}`,
          value: level.id,
        }))}
      />
      <ChaptersForm initialData={course} courseId={course.id} />

      <PriceForm initialData={course} courseId={course.id} />
      <AttachmentForm initialData={course} courseId={course.id} />
    </>
  );
}
