"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ChapterActions() {
  const { courseId, chapterId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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
        <ConfirmModal onConfirm={onDelete}>
          <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal>
      </div>
    </>
  );
}
