"use client";

import { useState } from "react";

import { ClipboardList, ClipboardPenLine, FileVideo, Plus } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group";
import { Label } from "@/components/shadcn/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "./FormSchema";
import { toast } from "sonner";
import axios from "@/config/axios";
import { useParams } from "next/navigation";
import { z } from "zod";

export function CreateLessonModal() {
  const [open, setOpen] = useState(false);
  const [lessonType, setLessonType] = useState("CLASS");

  const { chapterId } = useParams();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios.post(`/api/lessons/chapter/${chapterId}`, {
        ...values,
        type: lessonType,
      });

      toast.success("Lección creada!");
      setOpen(false);
      form.reset();
      // router
    } catch (error) {
      console.log(error);
      toast.error("Something wrong");
    }
  };

  return (
    <>
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
    </>
  );
}
