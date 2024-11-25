"use client";

import { useState } from "react";

import { Card } from "@/components/shadcn/ui/card";
import { Separator } from "@/components/shadcn/ui/separator";
import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import ImageForm from "./ImageForm";
import LevelForm from "./LevelForm";
import ChaptersForm from "./ChaptersForm";
import PriceForm from "./PriceForm";
import AttachmentForm from "./AttachmentForm";
import { cn } from "@/libs/shadcn/utils";
import Title from "@/components/common/Title";
import SubTitleForm from "./SubTitleForm";
import TrailerForm from "./TrailerForm";
import CategoryForm from "./CategoryForm";
import SubCategoryForm from "./SubCategoryForm";
import { BookOpen, CalendarCog, DollarSign, Globe, Map } from "lucide-react";

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

export default function Content({ course }: { course: any }) {
  const [content, setContent] = useState<SectionTitleKey>("mainContent");

  const handleNavigation = (value: SectionTitleKey) => {
    setContent(value);
  };

  return (
    <>
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
                <TitleForm initialData={course} courseId={course.id} />
                <Separator />

                <SubTitleForm initialData={course} courseId={course.id} />
                <Separator />

                <DescriptionForm initialData={course} courseId={course.id} />
                <Separator />

                <LevelForm initialData={course} courseId={course.id} />
                <Separator />

                <section className="flex flex-col md:flex-row gap-5 w-full">
                  <CategoryForm course={course} courseId={course.id} />
                  <SubCategoryForm course={course} courseId={course.id} />
                </section>
                <Separator />

                <ImageForm course={course} />
                <Separator />

                <TrailerForm course={course} />
              </>
            )}

            {content === "price" && (
              <>
                <PriceForm course={course} courseId={course.id} />
              </>
            )}

            {content === "studyPlan" && (
              <>
                <ChaptersForm initialData={course} courseId={course.id} />
                <AttachmentForm initialData={course} courseId={course.id} />
              </>
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
