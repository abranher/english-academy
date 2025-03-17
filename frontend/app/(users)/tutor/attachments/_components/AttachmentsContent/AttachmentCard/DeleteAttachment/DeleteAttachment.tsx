"use client";

import axios from "@/config/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Attachment } from "@/types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ConfirmModal } from "@/components/modals/confirm-modal";

import { Button } from "@/components/shadcn/ui/button";
import { Trash } from "lucide-react";

export function DeleteAttachment({
  attachment,
  userId,
}: {
  attachment: Attachment;
  userId: string;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>
      axios.delete(`/api/attachments/${attachment.id}/user/${userId}`),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["get_tutor_attachments"],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          404: "Usuario o recurso no encontrados",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(errorMessages[status] || message);
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
        <Trash className="h-4 w-4" />
      </Button>
    </ConfirmModal>
  );
}
