"use client";

import { useRouter } from "next/navigation";
import axios from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/shadcn/ui/button";
import { CardContent } from "@/components/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import messages from "@/libs/validations/schemas/messages";
import { toast } from "sonner";
import { getLevels } from "../_services/get-levels";
import { Level } from "@/types/models/Level";
import { Skeleton } from "@/components/shadcn/ui/skeleton";

interface LevelFormProps {
  initialData: {
    levelId: string;
  };
  courseId: string;
}

const formSchema = z.object({
  levelId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export default function CategoryForm({
  initialData,
  courseId,
}: LevelFormProps) {
  const {
    isPending,
    error,
    data: levels,
  } = useQuery({
    queryKey: ["levels"],
    queryFn: getLevels,
  });

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      levelId: initialData?.levelId || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Nivel del curso actualizado!");
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
            {isPending ? (
              <>
                <Skeleton className="py-5" />

                <Skeleton className="py-2" />
              </>
            ) : (
              <FormField
                control={form.control}
                name="levelId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel del curso</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el nivel apropiado para tu curso" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {levels &&
                          levels.map((level: Level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.levelCode + " - " + level.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Elige el nivel adecuado para garantizar que tus
                      estudiantes puedan seguir el ritmo del curso y alcanzar
                      sus objetivos.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
