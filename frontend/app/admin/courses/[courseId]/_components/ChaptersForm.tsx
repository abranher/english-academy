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
import { cn } from "@/libs/shadcn/utils";
import messages from "@/libs/validations/schemas/messages";
import { Chapter } from "@/types/models/Chapter";
import { Course } from "@/types/models/Course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ChaptersFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function ChaptersForm({
  initialData,
  courseId,
}: ChaptersFormProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Capítulo creado!");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle className="flex justify-between gap-3 text-lg">
            Capítulos del curso
            <Button onClick={toggleCreating} variant="ghost">
              {isCreating ? (
                <>Cancelar</>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Añadir un capítulo
                </>
              )}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isCreating && (
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
                          placeholder="p.ej. 'Introducción al curso'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={!isValid || isSubmitting} type="submit">
                  Crear
                </Button>
              </form>
            </Form>
          )}
          {!isCreating && (
            <div
              className={cn(
                "text-sm mt-2",
                !initialData.chapters.length && "text-slate-500 italic"
              )}
            >
              {!initialData.chapters.length && "Sin capítulos"}
              {/* TODO: Add a list of chapters */}
            </div>
          )}
          {!isCreating && (
            <p className="text-xs text-muted-foreground mt-4">
              Arrastre y suelte para reordenar los capítulos
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
