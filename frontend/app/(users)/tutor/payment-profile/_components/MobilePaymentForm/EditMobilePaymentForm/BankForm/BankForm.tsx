"use client";

import axios from "@/config/axios";
import { z } from "zod";
import { Bank } from "@/types/models";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

export function BankForm({
  bankId,
  banks,
  tutorId,
}: {
  bankId: string;
  banks: Bank[] | [];
  tutorId: string;
}) {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { bankId },
  });

  const createMutation = useMutation({
    mutationFn: (mobilePayment: { bankId: string }) =>
      axios.patch(`/api/mobile-payments/tutor/${tutorId}`, mobilePayment),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: ["tutor_user_payment_profile"],
        });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Tutor no encontrado",
          500: "Error del servidor",
          "-1": "Error inesperado",
        };

        if (status) toast.error(message || errorMessages[status]);
        else toast.error(errorMessages["-1"] || message);
      } else {
        toast.error("Error de conexión o error inesperado");
        console.error("Error que no es de Axios:", error);
      }
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    createMutation.mutate({ bankId: data.bankId });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="bankId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banco</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el banco" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Bancos</SelectLabel>
                      {banks.map((bank) => (
                        <SelectItem key={bank.id} value={bank.id}>
                          {`${bank.code} - ${bank.name}`}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <section className="flex justify-end">
            <LoadingButton
              isLoading={createMutation.isPending}
              isValid={isValid}
              isSubmitting={isSubmitting}
              label="Actualizar"
            />
          </section>
        </form>
      </Form>
    </>
  );
}
