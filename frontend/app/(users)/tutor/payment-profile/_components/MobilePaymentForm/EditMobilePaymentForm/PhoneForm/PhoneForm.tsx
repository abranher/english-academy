"use client";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PhoneCode } from "@/types/enums";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Card } from "@/components/shadcn/ui/card";
import { PenLine, X } from "lucide-react";

export function PhoneForm({
  phoneCode,
  phoneNumber,
  tutorId,
}: {
  phoneCode: PhoneCode;
  phoneNumber: number;
  tutorId: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { phoneCodes } = useMobilePaymentData();

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phoneCode, phoneNumber },
  });

  const createMutation = useMutation({
    mutationFn: (mobilePayment: {
      phoneCode: PhoneCode;
      phoneNumber: number;
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
      phoneCode: data.phoneCode,
      phoneNumber: data.phoneNumber,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card className="p-4">
      <section className="flex justify-end">
        {!isEditing ? (
          <PenLine
            className="w-4 cursor-pointer hover:opacity-80"
            onClick={() => {
              setIsEditing(true);
            }}
          />
        ) : (
          <X
            className="w-4 cursor-pointer hover:opacity-80"
            onClick={() => {
              setIsEditing(false);
            }}
          />
        )}
      </section>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col gap-4"
        >
          <section className="flex flex-col gap-3">
            <Label>Télefono</Label>
            <section className="flex gap-3 items-center">
              <FormField
                control={form.control}
                name="phoneCode"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione código" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Códigos</SelectLabel>
                          {phoneCodes.map((phonecode) => (
                            <SelectItem key={phonecode} value={phonecode}>
                              {phonecode}
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isSubmitting || !isEditing}
                        placeholder="p.ej. '1234567'"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing && (
                <LoadingButton
                  isLoading={createMutation.isPending}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  label="Actualizar"
                />
              )}
            </section>
          </section>
        </form>
      </Form>
    </Card>
  );
}
