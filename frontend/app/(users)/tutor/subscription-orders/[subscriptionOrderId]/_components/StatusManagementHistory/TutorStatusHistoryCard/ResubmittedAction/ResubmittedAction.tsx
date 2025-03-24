"use client";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubscriptionOrder, SubscriptionOrderHistory } from "@/types/models";

import { LoadingButton } from "@/components/common/LoadingButton";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
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
import { Send } from "lucide-react";

export function ResubmittedAction({
  history,
  subscriptionOrder,
  tutorId,
}: {
  history: SubscriptionOrderHistory;
  subscriptionOrder: SubscriptionOrder;
  tutorId: string;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { subscriptionOrderId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const mutation = useMutation({
    mutationFn: (Order: { paymentReference: number }) =>
      axios.post(
        `/api/subscription-order-history/${history.id}/subscription-order/${subscriptionOrder.id}/tutor/${tutorId}/resubmitted`,
        Order
      ),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        toast.success(data.message);
        form.reset();
        queryClient.invalidateQueries({
          queryKey: ["tutor_subscription_order", subscriptionOrderId],
        });
        setOpen(false);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Historial o Órden o Tutor no encontrado",
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

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" className="flex gap-2 items-center">
            <Send className="w-4" />
            Reenviar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <AlertDialogHeader>
                <AlertDialogTitle>Cambiar Datos</AlertDialogTitle>
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
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <LoadingButton
                  isLoading={mutation.isPending}
                  isValid={isValid}
                  isSubmitting={isSubmitting}
                  label="Confirmar"
                />
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
