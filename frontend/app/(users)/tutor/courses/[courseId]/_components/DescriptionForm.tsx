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
  courseId: string;
}

const formSchema = z.object({
  description: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function DescriptionForm({
  initialData,
  courseId,
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
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Descripción del curso actualizada!");
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
                  <FormLabel>Descripción del curso</FormLabel>

                  <FormControl>
                    <Editor {...field} />
                  </FormControl>

                  <FormDescription>
                    Define la descripción que represente el contenido de tu
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
          </form>
        </Form>
      </CardContent>
    </>
  );
}
