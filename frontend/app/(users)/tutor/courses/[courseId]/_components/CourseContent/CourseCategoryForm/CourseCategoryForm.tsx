"use client";

import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/shadcn/ui/button";
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
import { toast } from "sonner";
import { Skeleton } from "@/components/shadcn/ui/skeleton";
import { getCategories } from "../../../_services/get-categories";
import { Category } from "@/types/models/Category";
import { Course } from "@/types/models/Course";
import messages from "@/libs/validations/schemas/messages";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";

const formSchema = z.object({
  categoryId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export function CourseCategoryForm({
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
    data: categories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: course?.categoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Categoría del curso actualizada!");
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
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
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoría del curso</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Elige una categoría para tu curso" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {categories && (
                              <>
                                <SelectLabel>Categorías</SelectLabel>
                                {categories.map((category: Category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.id}
                                  >
                                    {category.title}
                                  </SelectItem>
                                ))}
                              </>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selecciona la categoría que mejor se ajuste al tema
                        general de tu curso.
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
    </>
  );
}
