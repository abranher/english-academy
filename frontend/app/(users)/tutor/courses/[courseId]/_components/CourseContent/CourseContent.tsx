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

// Define un tipo para las posibles claves de sectionTitles
type SectionTitleKey = "mainContent" | "price" | "studyPlan";

// Define el tipo del objeto sectionTitles
type SectionTitles = {
  [key in SectionTitleKey]: string;
};

const sectionTitles: SectionTitles = {
  mainContent: "Contenido principal",
  price: "Precios",
  studyPlan: "Plan de estudio",
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

  const [content, setContent] = useState<SectionTitleKey>("mainContent");

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
              {content === "mainContent" ? (
                <BookOpen />
              ) : content === "price" ? (
                <DollarSign />
              ) : content === "studyPlan" ? (
                <CalendarCog />
              ) : (
                <Globe />
              )}

              {sectionTitles[content]}
            </h2>

            <Separator />

            {content === "mainContent" && (
              <>
                <CourseTitleForm title={course.title} />
                <Separator />

                <CourseSubTitleForm subtitle={course.subtitle} />
                <Separator />

                <CourseDescriptionForm description={course.description} />
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

            {content === "price" && (
              <CoursePriceForm course={course} courseId={course.id} />
            )}

            {content === "studyPlan" && (
              <CourseChaptersForm initialData={course} courseId={course.id} />
            )}
          </Card>

          <aside className="hidden lg:block lg:col-span-1">
            <div className="group flex flex-col gap-4 py-2">
              <Title>
                <Globe />
                General
              </Title>

              <nav className="grid gap-3 px-2">
                <div
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "mainContent" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("mainContent")}
                >
                  <BookOpen />
                  Contenido principal
                </div>

                <div
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "price" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("price")}
                >
                  <DollarSign />
                  Precios
                </div>
              </nav>

              <Title>
                <Map />
                Planifica tu curso
              </Title>

              <nav className="grid gap-3 px-2">
                <div
                  className={cn(
                    "flex gap-2 px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "studyPlan" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("studyPlan")}
                >
                  <CalendarCog />
                  Plan de estudio
                </div>
              </nav>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
