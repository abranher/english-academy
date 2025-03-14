"use client";

import { useRouter } from "next/navigation";

import axios from "@/config/axios";
import { z } from "zod";
import { cn } from "@/libs/shadcn/utils";
import { toast } from "sonner";
import { Spinner } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chapter, Course } from "@/types/models";

import { CourseChaptersList } from "./CourseChaptersList";
import { FormSchema } from "./FormSchema";

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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { FolderOpen, Plus } from "lucide-react";

export function CourseChaptersForm({
  initialData,
  courseId,
}: {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios.post(`/api/chapters/${courseId}`, values);
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

      await axios.put(`/api/chapters/${courseId}/reorder`, {
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
    router.push(`/tutor/courses/${courseId}/chapters/${id}`);
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

        <section
          className={cn(
            "text-sm my-6 w-full",
            !initialData.chapters.length && "text-slate-500 italic"
          )}
        >
          {!initialData.chapters.length && (
            <div className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Sin capítulos
              </p>
            </div>
          )}
          <CourseChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData.chapters || []}
          />
        </section>

        <CardDescription>
          Arrastre y suelte para reordenar los capítulos
        </CardDescription>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <section className="w-full flex justify-end">
              <Button className="flex gap-1">
                <Plus className="w-4 h-4" />
                Añadir
              </Button>
            </section>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Crear capítulo</DialogTitle>
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
                          concisa, asegurando que transmita los objetivos del
                          mismo.
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
