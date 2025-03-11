import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepFourSchema } from "./StepFourSchema";
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

export function StepFour() {
  const nextStep = useStepStudentStore((state) => state.nextStep);
  const userId = useStepStudentStore((state) => state.userId);

  const form = useForm<z.infer<typeof StepFourSchema>>({
    resolver: zodResolver(StepFourSchema),
  });

  const mutation = useMutation({
    mutationFn: (user: { name: string; lastName: string }) =>
      axios.post(`/api/students/signup/${userId}/names`, user),
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

  async function onSubmit(data: z.infer<typeof StepFourSchema>) {
    mutation.mutate({
      name: data.name,
      lastName: data.lastName,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Completa tus Datos Personales</CardTitle>
        <CardDescription>
          Escribe tu nombre y apellido para personalizar tu perfil y facilitar
          la identificación.
        </CardDescription>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <section className="mb-32">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ej: Jonh"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <br />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Ej: Doe"
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
