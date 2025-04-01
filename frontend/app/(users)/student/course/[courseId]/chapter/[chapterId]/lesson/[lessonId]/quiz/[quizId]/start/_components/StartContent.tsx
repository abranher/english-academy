"use client";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useQuizStore } from "@/services/store/student/quiz";
import { Quiz, QuizProgress } from "@/types/models";
import { getQuizWithProgress } from "@/services/network/enrollments/quiz";

import Test from "./Test";

export function StartContent({ studentId }: { studentId: string }) {
  const { quizId } = useParams();
  const exercises = useQuizStore((state) => state.exercises);

  const {
    isPending,
    data: lessonQuiz,
    isError,
  } = useQuery<
    Quiz & {
      quizProgress: QuizProgress | null;
      questions: {
        id: number;
        question: string;
        answers: string[];
        correctAnswer: number;
        points: number;
      }[];
    }
  >({
    queryKey: ["enrollment_course_quiz_datails", "start", quizId],
    queryFn: () => getQuizWithProgress(studentId, quizId as string),
  });

  useEffect(() => {
    if (lessonQuiz?.questions) {
      useQuizStore.setState({
        exercises: lessonQuiz.questions,
        currentExercise: 0,
      });
    }
  }, [lessonQuiz]);

  if (isPending) return <>Cargando...</>;
  if (isError) return <div>No se pudo cargar la información del curso.</div>;

  return (
    <section
      className={
        exercises.length === 0
          ? "container flex flex-col items-center justify-center"
          : "container flex flex-col items-center justify-center"
      }
    >
      <section className="m-auto lg:p-12 my-8">
        <article className="flex flex-col gap-4">
          {exercises.length > 0 && <Test />}
        </article>
      </section>
    </section>
  );
}
