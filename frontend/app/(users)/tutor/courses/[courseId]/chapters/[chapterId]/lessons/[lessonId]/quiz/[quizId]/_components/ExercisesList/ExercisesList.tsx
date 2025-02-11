"use client";

import { FolderOpen } from "lucide-react";
import { useParams } from "next/navigation";

export function ExercisesList() {
  const { quizId } = useParams();

  return (
    <>
      {
        <div className="text-lg w-full">
          <p className="flex justify-center flex-col items-center">
            <FolderOpen className="w-20 h-20" />
            Sin ejercicios
          </p>
        </div>
      }
    </>
  );
}
