import axios from "@/config/axios";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { StepOneSchema } from "./StepOneSchema";
import { LoadingButton } from "@/components/common/LoadingButton";
import { AxiosError } from "axios";

import { Input } from "@/components/shadcn/ui/input";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export function StepOne() {
  const nextStep = useStepStudentStore((state) => state.nextStep);
  const setUserId = useStepStudentStore((state) => state.setUserId);

  const form = useForm<z.infer<typeof StepOneSchema>>({
    resolver: zodResolver(StepOneSchema),
  });

  const mutation = useMutation({
    mutationFn: (user: { email: string }) =>
      axios.post("/api/students/signup/email", user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        setUserId(data.userId);
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
          409: "El email ya está en uso.",
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

  async function onSubmit(data: z.infer<typeof StepOneSchema>) {
    mutation.mutate({
      email: data.email,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Ingresa tu Email</CardTitle>
        <CardDescription>
          Proporciona una dirección de correo electrónico válida para crear tu
          cuenta y recibir notificaciones.
        </CardDescription>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <section className="mb-32">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="example@example.com"
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
