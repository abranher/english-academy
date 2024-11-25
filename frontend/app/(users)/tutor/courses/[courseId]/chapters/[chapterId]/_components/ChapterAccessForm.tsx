"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "@/config/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/shadcn/ui/form";
import { cn } from "@/libs/shadcn/utils";
import { Chapter } from "@/types/models/Chapter";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

interface ChapterAccessFormProps {
  initialData: Chapter;
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  isFree: z.boolean().default(false),
});

export default function ChapterAccessForm({
  initialData,
  courseId,
  chapterId,
}: ChapterAccessFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: Boolean(initialData.isFree),
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/chapters/${chapterId}/course/${courseId}`,
        values
      );
      toast.success("Acceso del capítulo actualizado!");
      toggleEdit();
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
            Configuración de acceso
            <Button onClick={toggleEdit} variant="ghost">
              {isEditing ? (
                <>Cancelar</>
              ) : (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar acceso
                </>
              )}
            </Button>
          </CardTitle>
          {!isEditing && (
            <>
              <CardDescription
                className={cn(
                  "text-sm mt-2",
                  !initialData.isFree && "text-slate-500 italic"
                )}
              >
                {initialData.isFree
                  ? "Este capítulo está disponible para vista previa."
                  : "Este capítulo no está disponible para vista previa."}
              </CardDescription>
            </>
          )}
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
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormDescription>
                          Marque esta casilla si desea que este capítulo este
                          disponible para vista previa
                        </FormDescription>
                      </div>
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
