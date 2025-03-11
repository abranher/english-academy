import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StepSixSchema } from "./StepSixSchema";
import { z } from "zod";

import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/shadcn/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { LoadingButton } from "@/components/common/LoadingButton";

export function StepSix() {
  const nextStep = useStepStudentStore((state) => state.nextStep);
  const userId = useStepStudentStore((state) => state.userId);

  const form = useForm<z.infer<typeof StepSixSchema>>({
    resolver: zodResolver(StepSixSchema),
  });

  const mutation = useMutation({
    mutationFn: (user: { birth: Date }) =>
      axios.post(`/api/students/signup/${userId}/birth`, user),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        nextStep();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error);
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

  async function onSubmit(data: z.infer<typeof StepSixSchema>) {
    const birthDate = new Date(data.birth);
    const utcBirthDate = new Date(
      Date.UTC(
        birthDate.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate(),
        birthDate.getHours(),
        birthDate.getMinutes(),
        birthDate.getSeconds(),
        birthDate.getMilliseconds()
      )
    );

    mutation.mutate({ birth: utcBirthDate });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Tu Fecha de Nacimiento y País</CardTitle>
        <CardDescription>
          Indica tu fecha de nacimiento y el país en el que resides para ajustar
          la experiencia a tus necesidades.
        </CardDescription>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <section className="mb-32">
            <FormField
              control={form.control}
              name="birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      disabled={isSubmitting}
                      max={new Date().toISOString().split("T")[0]}
                      min="1900-01-01"
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
