"use client";

import Link from "next/link";

import { Course } from "@/types/models";

import { MiniCoursePreviewCard } from "./MiniCoursePreviewCard";
import { CourseActions } from "../CourseActions";
import { CourseStatusBanner } from "./CourseStatusBanner";

import { Separator } from "@/components/shadcn/ui/separator";
import { Button } from "@/components/shadcn/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { ChevronLeft } from "lucide-react";

export function HeaderSection({
  course,
  userId,
  tutorId,
}: {
  course: Course;
  userId: string;
  tutorId: string;
}) {
  const requieredFields = [
    course.title,
    course.description,
    course.image,
    course.priceId,
    course.levelId,
    course.chapters,
  ];

  const totalFields = requieredFields.length;
  const completedFields = requieredFields.filter(Boolean).length;

  const completionText = `${completedFields} de ${totalFields}`;

  const isComplete = requieredFields.every(Boolean);

  return (
    <>
      <MiniCoursePreviewCard course={course} />

      <Separator />

      <CourseStatusBanner course={course} />

      <section className="flex items-center gap-4">
        <Link href={"/tutor/courses"}>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">atrás</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Configuración del curso
        </h1>
        <p className="flex-1 shrink-0 whitespace-nowrap tracking-tight">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{completionText}</TooltipTrigger>
              <TooltipContent>
                <p>Completa todos los campos.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>

        <CourseActions course={course} tutorId={tutorId} userId={userId} />
      </section>
    </>
  );
}
