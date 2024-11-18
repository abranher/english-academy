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

export default function Content({ course }: { course: any }) {
  const [content, setContent] = useState("mainContent");

  const sectionTitles = {
    mainContent: "Contenido principal",
    price: "Precios",
    studyPlan: "Plan de estudio",
  };

  const handleNavigation = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <section className="w-full flex">
        <div className="lg:grid lg:grid-cols-4 w-full space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <Card className="lg:col-span-3 flex w-full flex-col gap-4 p-5">
            <h2 className="text-xl px-5">{sectionTitles[content]}</h2>
            <Separator className="mx-5 my-2" />

            {content === "mainContent" && (
              <>
                <TitleForm initialData={course} courseId={course.id} />
                <SubTitleForm initialData={course} courseId={course.id} />
                <DescriptionForm initialData={course} courseId={course.id} />
                <LevelForm initialData={course} courseId={course.id} />
                <ImageForm course={course} />
              </>
            )}

            {content === "price" && (
              <>
                <PriceForm initialData={course} courseId={course.id} />
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
              <Title>General</Title>

              <nav className="grid gap-3 px-2">
                <div
                  className={cn(
                    "flex px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "mainContent" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("mainContent")}
                >
                  Contenido principal
                </div>

                <div
                  className={cn(
                    "flex px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "price" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("price")}
                >
                  Precios
                </div>
              </nav>

              <Title>Planifica tu curso</Title>

              <nav className="grid gap-3 px-2">
                <div
                  className={cn(
                    "flex px-3 py-2 items-center justify-center whitespace-nowrap text-md font-medium transition-colors cursor-pointer",
                    content === "studyPlan" &&
                      "bg-zinc-100 text-zinc-900 border-l-3 border-zinc-400 dark:bg-zinc-800/50 dark:text-zinc-50",
                    "justify-start"
                  )}
                  onClick={() => handleNavigation("studyPlan")}
                >
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
