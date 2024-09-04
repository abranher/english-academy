"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/shadcn/ui/button";
import { Trash } from "lucide-react";

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
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => {}}
          disabled={disabled}
          variant="outline"
          size="sm"
        >
          {isPublished ? "Anular publicación" : "Publicar"}
        </Button>
        <ConfirmModal onConfirm={() => {}}>
          <Button size="sm">
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal>
      </div>
    </>
  );
}
