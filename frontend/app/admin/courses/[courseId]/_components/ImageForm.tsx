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
import { Textarea } from "@/components/shadcn/ui/textarea";
import axios from "@/config/axios";
import { cn } from "@/libs/shadcn/utils";
import messages from "@/libs/validations/schemas/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string(messages.requiredError).min(1, messages.min(1)),
});

export default function ImageForm({ initialData, courseId }: ImageFormProps) {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl || "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Descripción del curso actualizada!");
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
          <CardTitle className="flex justify-between gap-3">
            Imagen del curso
            <Button onClick={toggleEdit} variant="ghost">
              {isEditing && <>Cancelar</>}

              {!isEditing && !initialData.imageUrl && (
                <>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Añadir una imagen
                </>
              )}
              {!isEditing && initialData.imageUrl && (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Editar imagen
                </>
              )}
            </Button>
          </CardTitle>
          {!isEditing &&
            (!initialData.imageUrl ? (
              <CardDescription className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-500" />
              </CardDescription>
            ) : (
              <div className="relative aspect-video mt-2">
                <Image
                  alt="Upload"
                  fill
                  className="object-cover rounded-md"
                  src={initialData.imageUrl}
                />
              </div>
            ))}
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
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          disabled={isSubmitting}
                          placeholder="e.g. 'Este curso trata sobre...'"
                          {...field}
                        />
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
      </Card>
    </>
  );
}
