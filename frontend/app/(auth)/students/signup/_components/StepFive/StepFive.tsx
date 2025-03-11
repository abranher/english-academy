import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepFiveSchema } from "./StepFiveSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";

import { Input } from "@/components/shadcn/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { AxiosError } from "axios";
import { LoadingButton } from "@/components/common/LoadingButton";

export function StepFive() {
  const nextStep = useStepStudentStore((state) => state.nextStep);
  const userId = useStepStudentStore((state) => state.userId);

  const form = useForm<z.infer<typeof StepFiveSchema>>({
    resolver: zodResolver(StepFiveSchema),
  });

  const mutation = useMutation({
    mutationFn: (user: { username: string }) =>
      axios.post(`/api/students/signup/${userId}/username`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        nextStep();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Usuario no encontrado",
          409: "El nombre de usuario ya está en uso.",
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

  async function onSubmit(data: z.infer<typeof StepFiveSchema>) {
    mutation.mutate({
      username: data.username,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Crea tu Nombre de Usuario</CardTitle>
        <CardDescription>
          Elige un nombre de usuario único que te represente en la plataforma.
        </CardDescription>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <section className="mb-32">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ej: jonhdoe12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>
          <div className="w-full flex justify-end">
            <LoadingButton
              isLoading={mutation.isPending}
              isValid={isValid}
              isSubmitting={isSubmitting}
              label="Continuar"
            />
          </div>
        </form>
      </Form>
    </>
  );
}
