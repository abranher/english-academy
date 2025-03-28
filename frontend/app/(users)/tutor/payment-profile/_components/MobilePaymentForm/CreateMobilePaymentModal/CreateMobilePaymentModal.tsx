"use client";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { getBanks } from "../../../_services/get-banks";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentType, PhoneCode } from "@/types/enums";
import { Bank, MobilePayment, Tutor, User } from "@/types/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";
import { useMobilePaymentData } from "@/hooks/useMobilePaymentData";
import { CreateMobilePaymentSkeleton } from "./CreateMobilePaymentSkeleton";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
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

export function CreateMobilePaymentModal({
  userTutor,
}: {
  userTutor: User & {
    tutor: Tutor & { mobilePayment: (MobilePayment & { bank: Bank }) | null };
  };
}) {
  const { phoneCodes, documentTypes } = useMobilePaymentData();
  const [open, setOpen] = useState(false);

  const {
    isPending,
    data: banks,
    isError,
  } = useQuery<Bank[] | []>({
    queryKey: ["get_banks_tutor_payment_profile_create"],
    queryFn: getBanks,
  });

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const createMutation = useMutation({
    mutationFn: (mobilePayment: {
      phoneCode: PhoneCode;
      phoneNumber: number;
      documentType: DocumentType;
      documentNumber: number;
      bankId: string;
    }) =>
      axios.post(
        `/api/mobile-payments/tutor/${userTutor.tutor.id}`,
        mobilePayment
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        form.reset();
        setOpen(false);
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
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      bankId: data.bankId,
    });
  }

  const { isSubmitting, isValid } = form.formState;

  if (isError) return <div>No se pudo cargar la información.</div>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <section className="w-full flex justify-end">
          <Button>Agregar</Button>
        </section>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agrega los datos de tu Pago Móvil</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isPending ? (
            <CreateMobilePaymentSkeleton />
          ) : (
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
                              disabled={isSubmitting}
                              placeholder="p.ej. '1234567'"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>
                </section>

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
                                  <SelectItem
                                    key={documentType}
                                    value={documentType}
                                  >
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
                    label="Crear"
                  />
                </section>
              </form>
            </Form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
