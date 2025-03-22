"use client";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentType } from "@/types/enums";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";
import { useMobilePaymentData } from "@/hooks/useMobilePaymentData";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Label } from "@/components/shadcn/ui/label";

export function DocumentForm({
  documentType,
  documentNumber,
  tutorId,
}: {
  documentType: DocumentType;
  documentNumber: number;
  tutorId: string;
}) {
  const { documentTypes } = useMobilePaymentData();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { documentType, documentNumber },
  });

  const createMutation = useMutation({
    mutationFn: (mobilePayment: {
      documentType: DocumentType;
      documentNumber: number;
    }) => axios.patch(`/api/mobile-payments/tutor/${tutorId}`, mobilePayment),
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
    createMutation.mutate({
      documentType: data.documentType,
      documentNumber: data.documentNumber,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-4"
        >
          <section className="flex flex-col gap-3">
            <Label>Documento</Label>
            <section className="flex gap-3 items-center">
              <FormField
                control={form.control}
                name="documentType"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de documento" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Tipos de documento</SelectLabel>
                          {documentTypes.map((documentType) => (
                            <SelectItem key={documentType} value={documentType}>
                              {documentType}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="documentNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="p.ej. '12345678'"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </section>

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
