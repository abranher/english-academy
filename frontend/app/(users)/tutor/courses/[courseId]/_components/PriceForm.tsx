"use client";

import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getPrices } from "../_services/get-prices";

import { Button } from "@/components/shadcn/ui/button";
import { toast } from "sonner";
import { CardContent } from "@/components/shadcn/ui/card";
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
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import messages from "@/libs/validations/schemas/messages";
import { Course } from "@/types/models/Course";
import { Price } from "@/types/models/Price";

const formSchema = z.object({
  priceId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export default function PriceForm({
  course,
  courseId,
}: {
  course: Course;
  courseId: string;
}) {
  const router = useRouter();

  const {
    isPending,
    error,
    data: prices,
  } = useQuery({
    queryKey: ["prices"],
    queryFn: getPrices,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priceId: course?.priceId || "",
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

      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            {isPending ? (
              <>
                <Skeleton className="py-5" />
                <Skeleton className="py-2" />
                <Skeleton className="h-10 w-20 py-2" />
              </>
            ) : (
              <>
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
                            {prices && (
                              <>
                                <SelectLabel>Precios</SelectLabel>
                                {prices.map((price: Price) => (
                                  <SelectItem key={price.id} value={price.id}>
                                    {price.amount}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selecciona un precio que consideres adecuado para tu
                        curso.
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
              </>
            )}
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
