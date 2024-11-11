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
  FormField,
  FormItem,
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
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

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
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between gap-3 text-lg">
          Precio del curso
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancelar</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Editar precio
              </>
            )}
          </Button>
        </CardTitle>
        {!isEditing && (
          <CardDescription
            className={cn(
              "text-sm mt-2",
              !initialData.price && "text-slate-500 italic"
            )}
          >
            {initialData.price ? formatPrice(initialData.price) : "Sin precio"}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {isEditing && (
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
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        disabled={isSubmitting}
                        placeholder="Establece un precio para tu curso"
                        {...field}
                      />
                    </FormControl>
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
        )}
      </CardContent>
    </>
  );
}
