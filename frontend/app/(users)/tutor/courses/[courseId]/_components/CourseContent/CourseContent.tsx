"use client";

import { useParams } from "next/navigation";

import { cn } from "@/libs/shadcn/utils";
import { Course } from "@/types/models/Course";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCourse } from "../../_services/get-course";

import { CourseTitleForm } from "./CourseTitleForm";
import { CourseSubTitleForm } from "./CourseSubTitleForm";
import { CourseDescriptionForm } from "./CourseDescriptionForm";
import { CourseLearningObjectivesForm } from "./CourseLearningObjectivesForm";
import { CourseLevelForm } from "./CourseLevelForm";
import { CourseCategoryForm } from "./CourseCategoryForm";
import { CourseSubCategoryForm } from "./CourseSubCategoryForm";
import { CourseImageForm } from "./CourseImageForm";
import { CourseTrailerForm } from "./CourseTrailerForm";
import { CoursePriceForm } from "./CoursePriceForm";
import { CourseChaptersForm } from "./CourseChaptersForm";
import { Title } from "@/components/common/Title";
import { CourseContentSkeleton } from "./CourseContentSkeleton";

import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import { BookOpen, CalendarCog, DollarSign, Globe, Map } from "lucide-react";
import { HeaderSection } from "./HeaderSection";

type SectionTitleKey = "MAIN_CONTENT" | "PRICE" | "STUDY_PLAN";

type SectionTitles = {
  [key in SectionTitleKey]: string;
};

const sectionTitles: SectionTitles = {
  MAIN_CONTENT: "Contenido principal",
  PRICE: "Precios",
  STUDY_PLAN: "Plan de estudio",
};

export function CourseContent() {
  const { courseId } = useParams();

  const {
    isPending,
    data: course,
    isError,
  } = useQuery<Course>({
    queryKey: ["get_course", courseId],
    queryFn: () => getCourse(courseId as string),
  });

  const [content, setContent] = useState<SectionTitleKey>("MAIN_CONTENT");

  const handleNavigation = (value: SectionTitleKey) => {
    setContent(value);
  };

  if (isPending) return <CourseContentSkeleton />;
  if (isError) return <>Ha ocurrido un error al cargar el curso</>;

  return (
    <>
      <HeaderSection course={course} />

      <Separator className="mb-3" />

      <section className="w-full flex">
        <div className="lg:grid lg:grid-cols-4 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Card className="lg:col-span-3 flex w-full flex-col gap-4 p-5">
            <h2 className="text-2xl px-5 font-semibold flex gap-3 items-center">
              {content === "MAIN_CONTENT" ? (
                <BookOpen />
              ) : content === "PRICE" ? (
                <DollarSign />
              ) : content === "STUDY_PLAN" ? (
                <CalendarCog />
              ) : (
                <Globe />
              )}

              {sectionTitles[content]}
            </h2>

            <Separator />

            {content === "MAIN_CONTENT" && (
              <>
                <CourseTitleForm title={course.title} />
                <Separator />

                <CourseSubTitleForm subtitle={course.subtitle} />
                <Separator />

                <CourseDescriptionForm description={course.description} />
                <Separator />

                <CourseLearningObjectivesForm
                  learningObjectives={course.learningObjectives}
                />
                <Separator />

                <CourseLevelForm levelId={course.levelId} />
                <Separator />

                <section className="flex flex-col md:flex-row gap-5 w-full">
                  <CourseCategoryForm categoryId={course.categoryId} />
                  <CourseSubCategoryForm
                    subcategoryId={course.subcategoryId}
                    categoryId={course.categoryId}
                  />
                </section>
                <Separator />

                <CourseImageForm image={course.image} />
                <Separator />

                <CourseTrailerForm trailer={course.trailer} />
              </>
            )}

            {content === "PRICE" && (
              <CoursePriceForm priceId={course.priceId} />
            )}

            {content === "STUDY_PLAN" && (
              <CourseChaptersForm chapters={course.chapters} />
            )}
          </Card>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="group flex flex-col gap-4 py-2">
              <Title>
                <Globe />
                General
              </Title>

              <nav className="grid gap-3 px-2">
                <section
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "MAIN_CONTENT" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("MAIN_CONTENT")}
                >
                  <BookOpen />
                  Contenido principal
                </section>

                <section
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "PRICE" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("PRICE")}
                >
                  <DollarSign />
                  Precios
                </section>
              </nav>

              <Title>
                <Map />
                Planifica tu curso
              </Title>

              <nav className="grid gap-3 px-2">
                <section
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "STUDY_PLAN" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("STUDY_PLAN")}
                >
                  <CalendarCog />
                  Plan de estudio
                </section>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
