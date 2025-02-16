import axios from "@/config/axios";
import { useStepTutorStore } from "@/services/store/auth/tutor/stepTutor";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { StepTwoSchema } from "./StepTwoSchema";
import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn/ui/input-otp";
import { AxiosError } from "axios";

export function StepTwo() {
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);

  const form = useForm<z.infer<typeof StepTwoSchema>>({
    resolver: zodResolver(StepTwoSchema),
    defaultValues: {
      token: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (user: { token: string }) =>
      axios.post(`/api/tutors/signup/${userId}/verify-email`, user),
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
          400: "Token no válido",
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

  async function onSubmit(data: z.infer<typeof StepTwoSchema>) {
    createUserMutation.mutate({
      token: data.token,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Verifica tu email</CardTitle>
        <CardDescription>
          Ingresa el toke que te hemos enviado al email registrado.
        </CardDescription>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <section className="mb-32 flex w-full justify-center">
            <FormField
              control={form.control}
              name="token"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col items-center gap-4">
                    <FormLabel>Token de un solo uso</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Por favor, introduzca el token de un solo uso enviado a su
                    email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <br />
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
