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
import messages from "@/libs/validations/schemas/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function ChapterTitleForm({
  initialData,
  courseId,
  chapterId,
}: ChapterTitleFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

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
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.log(error)
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle className="flex justify-between text-lg">
            Título del capítulo
            <Button onClick={toggleEdit} variant="ghost">
              {isEditing ? (
                <>Cancelar</>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar título
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>{initialData.title}</CardDescription>
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="p.ej. 'Introducción al curso...'"
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
      </Card>
    </>
  );
}
