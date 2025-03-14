"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { Price } from "@/types/models";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { getPrices } from "../../../_services/get-prices";
import { AxiosError } from "axios";
import { FormSchema } from "./FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";
import { CoursePriceSkeleton } from "./CoursePriceSkeleton";

import {
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

export function CoursePriceForm({ priceId }: { priceId: string | null }) {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    isPending,
    data: prices,
    isError,
  } = useQuery<Price[]>({
    queryKey: ["get_prices"],
    queryFn: getPrices,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      priceId: priceId ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (course: { priceId: string }) =>
      axios.patch(`/api/courses/${courseId}`, course),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Precio actualizado!");
        queryClient.invalidateQueries({ queryKey: ["get_course", courseId] });
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        const message = error.response?.data?.message || "Error desconocido";

        const errorMessages: { [key: number]: string } = {
          400: "Datos no válidos",
          404: "Curso no encontrado",
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate({ priceId: data.priceId });
  }

  const { isSubmitting, isValid } = form.formState;

  if (isPending) return <CoursePriceSkeleton />;
  if (isError) return <>Ha ocurrido un error cargando los precios</>;

  return (
    <>
      <CardTitle className="text-lg px-3">
        Tu conocimiento tiene valor. ¡Demuéstralo fijando un precio justo por tu
        curso!
      </CardTitle>

      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            <FormField
              control={form.control}
              name="priceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del curso</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige un precio para tu curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Precios</SelectLabel>
                        {prices.map((price: Price) => (
                          <SelectItem key={price.id} value={price.id}>
                            {price.amount}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Selecciona un precio que consideres adecuado para tu curso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <LoadingButton
                isLoading={mutation.isPending}
                isValid={isValid}
                isSubmitting={isSubmitting}
                label="Guardar"
              />
            </div>
          </form>
        </Form>
      </CardContent>

      <CardTitle className="text-lg px-3">Importancia del precio:</CardTitle>
      <CardDescription className="px-3">
        Fijar un precio demuestra un compromiso profesional con tu trabajo y te
        posiciona como un experto en la materia.
      </CardDescription>
    </>
  );
}
