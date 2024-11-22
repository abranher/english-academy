"use client";

import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import messages from "@/libs/validations/schemas/messages";
import { getSubCategories } from "../_services/get-subcategories";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
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
import { SubCategory } from "@/types/models/SubCategory";
import { Course } from "@/types/models/Course";

interface LevelFormProps {
  course: Course;
  courseId: string;
}

const formSchema = z.object({
  subcategoryId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export default function SubCategoryForm({ course, courseId }: LevelFormProps) {
  const router = useRouter();

  const {
    isPending,
    error,
    data: subcategories,
  } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubCategories,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subcategoryId: course?.subcategoryId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Subcategoría del curso actualizada!");
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
                            {subcategories && (
                              <>
                                <SelectLabel>Subcategorías</SelectLabel>
                                {subcategories.map(
                                  (subcategory: SubCategory) => (
                                    <SelectItem
                                      key={subcategory.id}
                                      value={subcategory.id}
                                    >
                                      {subcategory.title}
                                    </SelectItem>
                                  )
                                )}
                              </>
                            )}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        La subcategoría te permite especificar aún más el tema
                        de tu curso.
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
