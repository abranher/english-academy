import { useState } from "react";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepTwoSchema } from "./StepTwoSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useStepStudentStore } from "@/store/auth/student/stepStudent";

import { Input } from "@/components/shadcn/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/shadcn/ui/button";
import { CardDescription, CardTitle } from "@/components/shadcn/ui/card";
import { EyeIcon, EyeOff, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

export function StepTwo() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  const nextStep = useStepStudentStore((state) => state.nextStep);

  const form = useForm<z.infer<typeof StepTwoSchema>>({
    resolver: zodResolver(StepTwoSchema),
  });

  const createUserMutation = useMutation({
    mutationFn: (user: { password: string }) =>
      axios.post("/api/students/signup/password", user),
    onSuccess: (response) => {
      if (response.status === 201) {
        toast.success(response.data.message);
        nextStep();
      }
    },
    onError: (error) => {
      console.log(error);
      if (error.response.status === 409) {
        toast.error(error.response.data.message);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof StepTwoSchema>) {
    createUserMutation.mutate({
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
          <section className="mb-32">
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
