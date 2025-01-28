import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { StepOneSchema } from "./StepOneSchema";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useStepStudentStore } from "@/store/auth/student/stepStudent";

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

export function StepOne() {
  const nextStep = useStepStudentStore((state) => state.nextStep);
  const form = useForm<z.infer<typeof StepOneSchema>>({
    resolver: zodResolver(StepOneSchema),
    defaultValues: {
      email: "",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (user: { email: string }) =>
      axios.post("/api/students/signup/email", user),
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

  async function onSubmit(data: z.infer<typeof StepOneSchema>) {
    createUserMutation.mutate({
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
