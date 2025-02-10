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
import { FolderOpen, Plus } from "lucide-react";
import { toast } from "sonner";
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

export function ExercisesForm() {
  const [open, setOpen] = useState(false);
  const [lessonType, setLessonType] = useState("CLASS");

  const router = useRouter();

  const onSubmit = async () => {
    /*
    try {
      await axios.post(`/api/lessons/chapter/:chapterId`, {
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
      */
  };

  return (
    <>
      <CardContent className="relative">
        <CardTitle className="flex justify-between gap-3 text-lg mb-3">
          Ejercicios del quiz
        </CardTitle>

        <CardDescription>
          Es hora de crear ejercicios prácticos que refuercen el aprendizaje.
        </CardDescription>

        <div className={cn("text-sm my-6 w-full", "text-slate-500 italic")}>
          {
            <div className="text-lg w-full">
              <p className="flex justify-center flex-col items-center">
                <FolderOpen className="w-20 h-20" />
                Sin ejercicios
              </p>
            </div>
          }
        </div>

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
              <DialogTitle>Crear ejercicio</DialogTitle>
              <DialogDescription>
                Haz clic en Crear cuando hayas terminado.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <form onSubmit={onSubmit} className="space-y-4 mt-4">
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

                <DialogFooter>
                  <Button type="submit">Crear</Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </>
  );
}
