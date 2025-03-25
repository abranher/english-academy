"use client";

import axios from "@/config/axios";
import { Bank, MobilePayment, Plan } from "@/types/models";
import { formatPrice } from "@/libs/format";
import { PaymentMethod } from "@/types/enums";
import { useStepPlanSubscriptionStore } from "@/services/store/tutor/plan-subscription";

import { Title } from "@/components/common/Title";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { Button } from "@/components/shadcn/ui/button";
import { Separator } from "@/components/shadcn/ui/separator";
import { IdCard, Landmark, Phone, Smartphone } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "@/services/network/platform/get-payment-methods";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { useState } from "react";
import { Label } from "@/components/shadcn/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormSchema";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { LoadingButton } from "@/components/common/LoadingButton";

export function StepTwo({
  plan,
  userId,
  studentId,
}: {
  plan: Plan;
  userId: string;
  studentId: string;
}) {
  const [tabs, setTabs] = useState<string>(PaymentMethod.MOBILE_PAYMENT);

  const nextStep = useStepPlanSubscriptionStore((state) => state.nextStep);
  const prevStep = useStepPlanSubscriptionStore((state) => state.prevStep);

  const {
    isPending,
    data: mobilePayment,
    isError,
  } = useQuery<MobilePayment & { bank: Bank }>({
    queryKey: ["get_payment_method_checkout_form"],
    queryFn: () => getPaymentMethods(userId as string),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const mutation = useMutation({
    mutationFn: (subscriptionOrder: { paymentReference: number }) =>
      axios.post(`/api/subscription-orders/tutor/${studentId}/plan/${plan.id}`, {
        ...subscriptionOrder,
        subscriptionPrice: plan.price,
      }),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        form.reset();
        nextStep();
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Tutor o plan no encontrado",
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
    mutation.mutate({ paymentReference: data.paymentReference });
  }

  const { isSubmitting, isValid } = form.formState;

  if (isPending) return <>Cargando...</>;
  if (isError) return <>Ha ocurrido un error al cargar los metodos de pago</>;

  return (
    <>
      <section className="text-center mb-6">
        <CardTitle className="mb-3">Pagar Orden de Suscripción</CardTitle>
        <CardDescription>
          Realiza el pago de tu Suscripción y haz clic en Pagar.
        </CardDescription>
      </section>

      <section className="flex flex-col gap-5">
        <CardTitle>Metodos de pago disponibles</CardTitle>

        <RadioGroup
          onValueChange={setTabs}
          defaultValue={tabs}
          className="flex gap-3"
        >
          <section className="w-full">
            <RadioGroupItem
              value={PaymentMethod.MOBILE_PAYMENT}
              id={PaymentMethod.MOBILE_PAYMENT}
              className="peer sr-only"
            />
            <Label
              htmlFor={PaymentMethod.MOBILE_PAYMENT}
              className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Smartphone className="mb-3 h-6 w-6" />
              <span className="whitespace-nowrap">Pago móvil</span>
            </Label>
          </section>

          <section className="w-full">
            <RadioGroupItem
              value={PaymentMethod.PAYPAL}
              id={PaymentMethod.PAYPAL}
              className="peer sr-only"
              disabled
            />
            <Label
              htmlFor={PaymentMethod.PAYPAL}
              className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <svg role="img" viewBox="0 0 24 24" className="mb-3 h-6 w-6">
                <path
                  d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="whitespace-nowrap">PayPal</span>
            </Label>
          </section>
        </RadioGroup>

        <Separator className="my-3" />

        <CardTitle>Realiza tu Pago Móvil</CardTitle>

        <CardDescription>
          Sigue los siguientes pasos para formalizar tu Orden
        </CardDescription>

        <Title>
          1. Realiza el pago desde tu entidad bancaria al siguiente beneficiario
        </Title>

        <Card>
          <CardContent>
            <Title>Datos del beneficiario</Title>

            <section className="flex flex-col gap-4">
              <CardDescription className="text-lg flex items-center gap-3">
                <Phone className="h-6 w-6" />
                {`${mobilePayment.phoneCode} - ${mobilePayment.phoneNumber}`}
              </CardDescription>

              <CardDescription className="text-lg flex items-center gap-3">
                <IdCard className="h-6 w-6" />
                {`${mobilePayment.documentType} - ${mobilePayment.documentNumber}`}
              </CardDescription>

              <CardDescription className="text-lg flex items-center gap-3">
                <Landmark className="h-6 w-6" />
                {`${mobilePayment.bank.code} - ${mobilePayment.bank.name}`}
              </CardDescription>
            </section>

            <Separator className="my-4" />

            <article className="flex justify-between">
              <CardDescription>Subtotal:</CardDescription>
              <CardDescription className="font-bold text-lg text-zinc-800">
                {formatPrice(plan.price)}
              </CardDescription>
            </article>

            <article className="flex justify-between">
              <CardDescription>Descuento:</CardDescription>
              <CardDescription className="font-bold text-lg text-zinc-800">
                $0.00
              </CardDescription>
            </article>
            <Separator className="my-4" />

            <article className="flex justify-between">
              <CardDescription>Total a pagar:</CardDescription>
              <CardDescription className="font-bold text-lg text-zinc-800">
                {formatPrice(plan.price)}
              </CardDescription>
            </article>

            <article className="flex justify-end">
              <Title>Tasa del BCV*</Title>
            </article>
          </CardContent>
        </Card>

        <Title>
          2. Ingresa los 6 últimos digitos de tu comprobante de pago
        </Title>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="paymentReference"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Número de referencia</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej. '012345'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Deben ser los 6 últimos digitos del número de referencia
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <article className="w-full flex justify-between mt-5">
              <Button
                variant="outline"
                onClick={() => {
                  prevStep();
                }}
                type="button"
              >
                Volver
              </Button>

              <LoadingButton
                isLoading={mutation.isPending}
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Pagar"
              />
            </article>
          </form>
        </Form>
      </section>
    </>
  );
}
