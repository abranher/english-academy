"use client";

import { QuizQuestion } from "@/types/models";

import { QuizQuestionForm } from "./QuizQuestionForm";
import { QuizQuestionOptionsList } from "./QuizQuestionOptionsList";

import { Separator } from "@/components/shadcn/ui/separator";
import { Card } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import { Button } from "@/components/shadcn/ui/button";
import { Trash } from "lucide-react";
import { CorrectOptionForm } from "./CorrectOptionForm";

export function QuizQuestionCard({
  quizQuestion,
  index,
}: {
  quizQuestion: QuizQuestion;
  index: number;
}) {
  return (
    <>
      <Card className="p-6 flex flex-col gap-6">
        <section className="flex justify-between items-center">
          <Badge>N° {index}</Badge>
          <Button size="sm" variant="outline">
            <Trash className="h-4 w-4" />
          </Button>
        </section>

        <QuizQuestionForm quizQuestion={quizQuestion} />
        <Separator />

        <QuizQuestionOptionsList quizQuestion={quizQuestion} />

        <CorrectOptionForm quizQuestion={quizQuestion} />
      </Card>
    </>
  );
}
