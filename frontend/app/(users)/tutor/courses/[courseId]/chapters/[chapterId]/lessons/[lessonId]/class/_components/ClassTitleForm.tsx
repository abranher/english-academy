"use client";

import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/shadcn/ui/button";
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
import { Input } from "@/components/shadcn/ui/input";
import messages from "@/libs/validations/schemas/messages";
import { toast } from "sonner";

interface ClassFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function ClassTitleForm({
  initialData,
  courseId,
  chapterId,
}: ClassFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/chapters/${chapterId}/course/${courseId}`,
        values
      );
      toast.success("Título del capítulo actualizado!");
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título del capítulo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej. 'Conversación en Inglés Fluido'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Define el título que mejor represente el contenido del
                    capítulo.
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
    </>
  );
}
