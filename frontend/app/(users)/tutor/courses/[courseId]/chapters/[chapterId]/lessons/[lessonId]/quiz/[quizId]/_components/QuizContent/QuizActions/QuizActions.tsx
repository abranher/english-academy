"use client";

import axios from "@/config/axios";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/shadcn/ui/button";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ClassActionsProps {
  disabled: boolean;
}

export function QuizActions({ disabled }: ClassActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { courseId, chapterId } = useParams();

  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/api/chapters/${chapterId}/course/${courseId}`
      );

      toast.success("Capítulo eliminado!");
      router.refresh();
      router.push(`/admin/courses/${courseId}`);
    } catch (error) {
      console.log(error);
      toast.error("Somethin ocurred!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="flex items-center gap-x-2">
        <ConfirmModal onConfirm={onDelete}>
          <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal>
      </section>
    </>
  );
}
