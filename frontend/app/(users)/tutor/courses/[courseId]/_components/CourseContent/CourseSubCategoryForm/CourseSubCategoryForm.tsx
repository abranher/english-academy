"use client";

import { useParams } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { FormSchema } from "./FormSchema";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSubCategories } from "../../../_services/get-subcategories";
import { useEffect, useState } from "react";
import { SubCategory } from "@/types/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { LoadingButton } from "@/components/common/LoadingButton";
import { CourseSubCategorySkeleton } from "./CourseSubCategorySkeleton";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { CardContent } from "@/components/shadcn/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

export function CourseSubCategoryForm({
  subcategoryId,
  categoryId,
}: {
  subcategoryId: string | null;
  categoryId: string | null;
}) {
  const [subcategories, setSubcategories] = useState<SubCategory[] | []>([]);

  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const { isPending, data, isError } = useQuery<SubCategory[]>({
    queryKey: ["get_subcategories"],
    queryFn: getSubCategories,
  });

  useEffect(() => {
    if (!data) return;

    const filtered = data.filter(
      (subcategory: SubCategory) => subcategory.categoryId === categoryId
    );

    setSubcategories(filtered);
  }, [categoryId, data]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      subcategoryId: subcategoryId ?? "",
    },
  });

  const mutation = useMutation({
    mutationFn: (course: { subcategoryId: string }) =>
      axios.patch(`/api/courses/${courseId}`, course),
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        toast.success("Subcategoría actualizada!");
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
    mutation.mutate({ subcategoryId: data.subcategoryId });
  }

  const { isSubmitting, isValid } = form.formState;

  if (isPending) return <CourseSubCategorySkeleton />;
  if (isError) return <>Ha ocurrido un error cargando las subcategorías</>;

  return (
    <>
      <CardContent className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 w-full"
          >
            <FormField
              control={form.control}
              name="subcategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategoría del curso</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Elige una subcategoría para tu curso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Subcategorías</SelectLabel>
                        {subcategories.map((subcategory: SubCategory) => (
                          <SelectItem
                            key={subcategory.id}
                            value={subcategory.id}
                          >
                            {subcategory.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    La subcategoría te permite especificar aún más el tema de tu
                    curso.
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
    </>
  );
}
