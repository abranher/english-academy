"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
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
import axios from "@/config/axios";
import { formatPrice } from "@/libs/format";
import { cn } from "@/libs/shadcn/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface PriceFormProps {
  initialData: {
    price: number;
  };
  courseId: string;
}

const formSchema = z.object({
  price: z.coerce.number(),
});

export default function PriceForm({ initialData, courseId }: PriceFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Precio del curso actualizado!");
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold px-3">
        Tu conocimiento tiene valor. ¡Demuéstralo fijando un precio justo por tu
        curso!
      </h2>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio del curso</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Establece un precio para tu curso"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este será el monto que pagaran los estudiantes por tu curso
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>

      <h2 className="text-lg font-semibold px-3">Importancia del precio:</h2>
      <p className="px-3">
        Fijar un precio demuestra un compromiso profesional con tu trabajo y te
        posiciona como un experto en la materia.
      </p>
    </>
  );
}
