import axios from "@/config/axios";

import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteCertification(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (certificationId: string) =>
      axios.delete(`/api/certifications/${certificationId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certifications", userId] });
      toast.success("Certificación eliminada exitosamente");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Certificación no encontrada",
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
}
