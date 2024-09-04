"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export default function ChapterActions({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/chapters/${chapterId}/course/${courseId}/unpublish`
        );

        toast.success("Capítulo no publicado!");
      } else {
        await axios.patch(
          `/api/chapters/${chapterId}/course/${courseId}/publish`
        );

        toast.success("Capítulo publicado!");
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `/api/chapters/${chapterId}/course/${courseId}`
      );

      console.log(res);
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
      <div className="flex items-center gap-x-2">
        <Button
          onClick={onClick}
          disabled={disabled || isLoading}
          variant="outline"
          size="sm"
        >
          {isPublished ? "Anular publicación" : "Publicar"}
        </Button>
        <ConfirmModal onConfirm={onDelete}>
          <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal>
      </div>
    </>
  );
}
