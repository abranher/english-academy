"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FilePen, LayoutGrid } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import {
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { cn } from "@/libs/shadcn/utils";
import { FolderOpen, Plus } from "lucide-react";
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
import { ExerciseType } from "@/types/enums/ExerciseType";

export function ExercisesForm() {
  const [open, setOpen] = useState(false);
  const [exerciseType, setExerciseType] = useState(
    ExerciseType.MULTIPLE_CHOICE
  );

  const router = useRouter();

  const handleRadioGroupChange = (value: string) => {
    const selectedType = Object.values(ExerciseType).find(
      (type) => type === value
    );

    if (selectedType) {
      setExerciseType(selectedType);
    } else {
      console.error("Tipo de ejercicio seleccionado no válido:", value);
    }
  };

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
                  value={exerciseType}
                  onValueChange={handleRadioGroupChange}
                  className="flex gap-4 text-center"
                >
                  <div className="w-full">
                    <RadioGroupItem
                      value={ExerciseType.MULTIPLE_CHOICE}
                      id={ExerciseType.MULTIPLE_CHOICE}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={ExerciseType.MULTIPLE_CHOICE}
                      className="flex text-xs flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <LayoutGrid className="mb-3 h-6 w-6" />
                      Selección multiple
                    </Label>
                  </div>
                  <div className="w-full">
                    <RadioGroupItem
                      value={ExerciseType.FILL_IN_THE_BLANK}
                      id={ExerciseType.FILL_IN_THE_BLANK}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={ExerciseType.FILL_IN_THE_BLANK}
                      className="flex text-xs flex-col items-center justify-between cursor-pointer rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <FilePen className="mb-3 h-6 w-6" />
                      Llenar espacio en blanco
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
