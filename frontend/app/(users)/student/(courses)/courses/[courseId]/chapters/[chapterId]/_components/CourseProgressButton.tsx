"use client";

import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

export default function CourseProgressButton({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapterId) {
        // confetti
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/student/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success("Progreso actualizado!");
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;

  return (
    <>
      <Button
        onClick={onClick}
        disabled={isLoading}
        type="button"
        variant={isCompleted ? "outline" : "success"}
        className="w-full md:w-auto"
      >
        {isCompleted ? "Sin completar" : "Marcar como completado"}
        <Icon className="h-4 w-4 ml-2" />
      </Button>
    </>
  );
}
