"use client";

import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Combobox } from "@/components/shadcn/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Textarea } from "@/components/shadcn/ui/textarea";
import axios from "@/config/axios";
import { cn } from "@/libs/shadcn/utils";
import messages from "@/libs/validations/schemas/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface LevelFormProps {
  initialData: {
    levelId: string;
  };
  courseId: string;
  options: { label: string; value: string }[];
}

const formSchema = z.object({
  levelId: z.string(messages.requiredError).min(1, messages.min(1)),
});

export default function LevelForm({
  initialData,
  courseId,
  options,
}: LevelFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

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
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something wrong");
    }
  };

  const selectedOption = options.find(
    (option) => option.value === initialData.levelId
  );

  return (
    <>
      <CardHeader>
        <CardTitle className="flex justify-between gap-3 text-lg">
          Nivel del curso
          <Button onClick={toggleEdit} variant="ghost">
            {isEditing ? (
              <>Cancelar</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Editar nivel
              </>
            )}
          </Button>
        </CardTitle>
        {!isEditing && (
          <CardDescription
            className={cn(
              "text-sm mt-2",
              !initialData.levelId && "text-slate-500 italic"
            )}
          >
            {selectedOption?.label || "Sin nivel"}
          </CardDescription>
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
                name="levelId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox options={...options} {...field} />
                    </FormControl>
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
