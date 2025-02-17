"use client";

import { useEffect, useState } from "react";
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
import { Progress } from "@/components/shadcn/ui/progress";

export function StepTwo() {
  const initialSeconds = 120;
  const nextStep = useStepTutorStore((state) => state.nextStep);
  const userId = useStepTutorStore((state) => state.userId);

  const [time, setTime] = useState(120); // Tiempo inicial en segundos
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (time <= 0) return; // No iniciar el contador si ya llegó a 0

    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }

        const newTime = prevTime - 1;
        setProgress((newTime / 120) * 100);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [time]); // Ahora depende de `time` para reiniciar el intervalo

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setTime(120);
    setProgress(100);
  };

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
          <section className="mb-16 flex w-full justify-center">
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
          </section>

          <div className="flex flex-col items-center gap-4 w-full max-w-md">
            <Progress value={progress} className="w-full h-2" />
            <div className="w-full flex items-center justify-between">
              <div className="text-xl font-semibold">
                Tiempo restante: {formatTime(time)}
              </div>
              <Button onClick={handleReset} disabled={time > 0} variant="link">
                Reenviar
              </Button>
            </div>
          </div>
          <br />

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
