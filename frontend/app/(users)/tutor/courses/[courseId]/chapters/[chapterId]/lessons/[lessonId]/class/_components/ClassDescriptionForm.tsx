"use client";

import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/shadcn/ui/button";
import { CardContent } from "@/components/shadcn/ui/card";
import Editor from "@/components/shadcn/ui/editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import messages from "@/libs/validations/schemas/messages";
import { toast } from "sonner";

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  chapterId: string;
  lessonId: string;
}

const formSchema = z.object({
  description: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function ClassDescriptionForm({
  initialData,
  chapterId,
  lessonId,
}: DescriptionFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/lessons/${lessonId}/chapter/${chapterId}/class`,
        values
      );
      toast.success("Descripción de la clase actualizada!");
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción de la clase</FormLabel>

                  <FormControl>
                    <Editor {...field} />
                  </FormControl>

                  <FormDescription>
                    Define la descripción que represente el contenido de tu
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
