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
  lessonId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function ClassTitleForm({
  initialData,
  lessonId,
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
        `/api/lessons/${lessonId}/chapter/${chapterId}/class`,
        values
      );
      toast.success("Título de la clase actualizada!");
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
                  <FormLabel>Título de la clase</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="p.ej. 'Conversación en Inglés Fluido'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Define el título que mejor represente el contenido de la
                    clase.
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
