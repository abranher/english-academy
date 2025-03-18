"use client";

import axios from "@/config/axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Attachment } from "@/types/models";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ConfirmModal } from "@/components/modals/confirm-modal";

import { Button } from "@/components/shadcn/ui/button";
import { X } from "lucide-react";

export function DeleteAttachment({
  classAttachmentId,
  attachment,
}: {
  classAttachmentId: string;
  attachment: Attachment;
}) {
  const queryClient = useQueryClient();
  const { classId, lessonId } = useParams();

  const mutation = useMutation({
    mutationFn: () =>
      axios.delete(
        `/api/class-attachments/${classAttachmentId}/class/${classId}/attachment/${attachment.id}`
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["get_attachments_form"],
        });
        queryClient.invalidateQueries({
          queryKey: ["get_class", classId, lessonId],
        });
      }
    },
    onError: (error) => {
      console.log(error);

      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          404: "Clase o recurso no encontrados",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(message || errorMessages[status]);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  async function onDelete() {
    mutation.mutate();
  }

  return (
    <ConfirmModal onConfirm={onDelete}>
      <Button size="sm" variant="outline" disabled={mutation.isPending}>
        <X className="h-4 w-4" />
      </Button>
    </ConfirmModal>
  );
}
