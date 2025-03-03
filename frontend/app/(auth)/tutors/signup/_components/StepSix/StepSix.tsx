import axios from "@/config/axios";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";
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

export function StepSix() {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);

  const form = useForm<z.infer<typeof StepSixSchema>>({
    resolver: zodResolver(StepSixSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: (user: { birth: Date }) =>
      axios.post(`/api/tutors/signup/${userId}/birth`, user),
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

    createUserMutation.mutate({ birth: utcBirthDate });
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
            {!createUserMutation.isPending ? (
              <Button disabled={!isValid || isSubmitting} type="submit">
                Continuar
              </Button>
            ) : (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Espere...
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
