"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/shadcn/ui/button";
import axios from "@/config/axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export default function Actions({
  disabled,
  courseId,
  isPublished,
}: ActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        const res = await axios.patch(`/api/courses/${courseId}/unpublish`);
        console.log(res);
        toast.success("Curso no publicado!");
      } else {
        const res = await axios.patch(`/api/courses/${courseId}/publish`);
        console.log(res);

        toast.success("Curso publicado!");
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
      const res = await axios.delete(`/api/courses/${courseId}`);

      console.log(res);
      toast.success("Curso eliminado!");
      router.refresh();
      router.push(`/admin/courses`);
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
