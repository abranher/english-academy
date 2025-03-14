"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

import { ClipboardList, ClipboardPenLine, FileVideo } from "lucide-react";
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
import { Spinner } from "@heroui/react";
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
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { Label } from "@/components/shadcn/ui/label";

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
  const [lessonType, setLessonType] = useState("CLASS");

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
      await axios.post(`/api/lessons/chapter/${chapterId}`, {
        ...values,
        type: lessonType,
      });

      toast.success("Lección creada!");
      setOpen(false);
      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      const response = await axios.put(`/api/lessons/${chapterId}/reorder`, {
        list: updateData,
      });

      toast.success("Lecciones reordenados");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
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
          Lecciones del capítulo
        </CardTitle>

        <CardDescription>
          Es hora de diseñar las clases y crear ejercicios prácticos que
          refuercen el aprendizaje.
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
                Sin lecciones
              </p>
            </div>
          )}
          <LessonsList
            onReorder={onReorder}
            items={initialData.lessons || []}
          />
        </div>

        <p className="text-xs text-muted-foreground my-4">
          Arrastre y suelte para reordenar las lecciones
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
              <DialogTitle>
                {lessonType === "CLASS"
                  ? "Crear Clase"
                  : lessonType === "QUIZ"
                  ? "Crear Quiz"
                  : "Crear Test"}
              </DialogTitle>
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
                  {/** Lesson type */}
                  <RadioGroup
                    value={lessonType}
                    onValueChange={setLessonType}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="CLASS"
                        id="CLASS"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="CLASS"
                        className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <FileVideo className="mb-3 h-6 w-6" />
                        Clase
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="QUIZ"
                        id="QUIZ"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="QUIZ"
                        className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <ClipboardList className="mb-3 h-6 w-6" />
                        Quiz
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="TEST"
                        id="TEST"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="TEST"
                        className="flex flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <ClipboardPenLine className="mb-3 h-6 w-6" />
                        Test
                      </Label>
                    </div>
                  </RadioGroup>

                  {/** Lesson title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>
                          {lessonType === "CLASS"
                            ? "Título de la Clase"
                            : lessonType === "QUIZ"
                            ? "Título del Quiz"
                            : "Título del Test"}
                        </FormLabel>

                        <FormControl>
                          <Input
                            disabled={isSubmitting}
                            placeholder="p.ej. 'Introducción al curso'"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Define el título de tu{" "}
                          {lessonType === "CLASS"
                            ? "clase"
                            : lessonType === "QUIZ"
                            ? "quiz"
                            : "test"}{" "}
                          de manera clara y concisa.
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
