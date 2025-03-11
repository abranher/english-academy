import axios from "@/config/axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepThreeSchema } from "./StepThreeSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useStepStudentStore } from "@/services/store/auth/student/stepStudent";

import { Input } from "@/components/shadcn/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { Check, EyeIcon, EyeOff, Loader2, X } from "lucide-react";
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

export function StepThree() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const nextStep = useStepStudentStore((state) => state.nextStep);
  const userId = useStepStudentStore((state) => state.userId);

  const form = useForm<z.infer<typeof StepThreeSchema>>({
    resolver: zodResolver(StepThreeSchema),
  });

  const password = form.watch("password");

  const hasMinLength = password?.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[.,\-_@$]/.test(password);

  const mutation = useMutation({
    mutationFn: (user: { password: string }) =>
      axios.post(`/api/students/signup/${userId}/password`, user),
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

  async function onSubmit(data: z.infer<typeof StepThreeSchema>) {
    mutation.mutate({
      password: data.password,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Crea tu Contraseña</CardTitle>
        <CardDescription>
          Establece una contraseña segura que proteja tu cuenta y mantenga tus
          datos a salvo.
        </CardDescription>
      </section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <section className="mb-7">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span
                        className="absolute right-4 top-2 cursor-pointer"
                        onClick={() => setVisiblePassword(!visiblePassword)}
                      >
                        {visiblePassword ? <EyeIcon /> : <EyeOff />}
                      </span>
                      <Input
                        disabled={isSubmitting}
                        type={visiblePassword ? "text" : "password"}
                        placeholder="************"
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <div className="mt-2 text-sm space-y-1">
                    <div
                      className={`flex items-center gap-2 ${
                        hasMinLength ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {hasMinLength ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      <span>Mínimo 8 caracteres</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        hasUppercase ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {hasUppercase ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      <span>Al menos una mayúscula</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        hasNumber ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {hasNumber ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      <span>Al menos un número</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 ${
                        hasSymbol ? "text-green-500" : "text-gray-500"
                      }`}
                    >
                      {hasSymbol ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                      <span>Al menos un símbolo (., - _ @ $)</span>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            <br />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirma Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span
                        className="absolute right-4 top-2 cursor-pointer"
                        onClick={() =>
                          setVisibleConfirmPassword(!visibleConfirmPassword)
                        }
                      >
                        {visibleConfirmPassword ? <EyeIcon /> : <EyeOff />}
                      </span>
                      <Input
                        disabled={isSubmitting}
                        type={visibleConfirmPassword ? "text" : "password"}
                        placeholder="************"
                        {...field}
                      />
                    </div>
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
