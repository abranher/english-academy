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
  FormDescription,
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

interface TitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function TitleForm({ initialData, courseId }: TitleFormProps) {
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
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Título del curso actualizado!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between text-lg">
          <span className="text-zinc-700 dark:text-zinc-200">
            Título del curso
          </span>
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
        <p className="dark:text-gray-200 font-bold text-xl pt-5">
          {initialData.title}
        </p>
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
                        placeholder="p.ej. 'Conversación en Inglés Fluido'"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Este es tu nombre público. Puede ser tu nombre real o un
                      seudónimo. Solo puedes cambiarlo una vez cada 30 días.
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
        )}
      </CardContent>
    </>
  );
}
