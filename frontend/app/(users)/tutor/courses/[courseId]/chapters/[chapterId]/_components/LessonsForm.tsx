"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/shadcn/ui/button";
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
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
import { cn } from "@/libs/shadcn/utils";
import messages from "@/libs/validations/schemas/messages";
import { Chapter } from "@/types/models/Chapter";
import { FolderOpen, Plus } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import LessonsList from "./LessonsList";
import { Lesson } from "@/types/models/Lesson";

interface LessonsFormProps {
  initialData: Chapter & { lessons: Lesson[] };
  chapterId: string;
}

const formSchema = z.object({
  title: z.string(messages.requiredError).min(4, messages.min(4)),
});

export default function LessonsForm({
  initialData,
  chapterId,
}: LessonsFormProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

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
      await axios.post(`/api/chapters/${chapterId}`, values);
      toast.success("Capítulo creado!");
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      const response = await axios.put(`/api/chapters/${chapterId}/reorder`, {
        list: updateData,
      });

      toast.success("Capítulos reordenados");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/tutor/courses/${chapterId}/chapters/${id}`);
  };

  return (
    <>
      <CardContent className="relative">
        {isUpdating && (
          <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        )}
        <CardTitle className="flex justify-between gap-3 text-lg mb-3">
          Capítulos del curso
        </CardTitle>

        <CardDescription>
          El primer paso para darle vida a tu curso es definir los capítulos,
          diseñar las clases y crear ejercicios prácticos que refuercen el
          aprendizaje.
        </CardDescription>

        <div
          className={cn(
            "text-sm my-6 w-full",
            !initialData.lessons.length && "text-slate-500 italic"
          )}
        >
          {!initialData.lessons.length && (
            <div className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Sin capítulos
              </p>
            </div>
          )}
          <LessonsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.lessons || []}
          />
        </div>

        <p className="text-xs text-muted-foreground my-4">
          Arrastre y suelte para reordenar los capítulos
        </p>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <section className="w-full flex justify-end">
              <Button>
                <Plus />
              </Button>
            </section>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear capítulo</DialogTitle>
              <DialogDescription>
                Haz clic en Crear cuando hayas terminado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
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
                            placeholder="p.ej. 'Introducción al curso'"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Define el título de tu capítulo de manera clara y
                          concisa, asegurando que transmita de forma efectiva
                          los objetivos de aprendizaje.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button disabled={!isValid || isSubmitting} type="submit">
                      Crear
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
}
